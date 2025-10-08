Notification System Design
Overview
This document outlines a scalable notification system for delivering push, email, and SMS notifications using an event-driven architecture with Apache Kafka as the message queue. The system addresses reliability, deduplication, prioritization, and rate limiting, with a focus on deferring events to a delay topic when rate limits are exceeded.
Key Aspects

Channels: Push (FCM/APNS), Email (SES/SendGrid), SMS (Twilio).
Rate Limiting: Enforce per-user and global limits, re-enqueuing events to a delay topic if exceeded.
Architecture: Event-driven with Kafka for decoupling producers and consumers.
Challenges:
Reliability: Fault tolerance via Kafka replication and retries.
Deduplication: Prevent duplicate notifications using unique IDs and Redis.
Prioritization: Handle high-priority notifications first via separate topics or queues.



Architecture
The system follows an event-driven pattern:

Event Producers: Publish events (e.g., user actions) to Kafka topics.
Kafka Topics: Buffer events (priority-high, priority-low, delayed-notifs).
Notification Workers: Consume events, apply logic (deduplication, rate limiting), and route to senders.
Rate Limiter: Uses Redis to enforce limits; re-enqueues to delay topic if exceeded.
Notification Senders: Handle channel-specific delivery (push, email, SMS).
Supporting Components: PostgreSQL for preferences/logs, Redis for caching/rate limiting.

Flow Diagram:
[Producers] --> [Kafka Topics] --> [Workers] --> [Rate Limiter] --> [Senders]
                                              |
                                              v
                                       [Database/Redis]

Components in Detail
1. Event Producers

Generate JSON events with user ID, notification type, content, priority, unique ID, and timestamp.
Use Kafka Producer API with idempotence to avoid duplicates.

2. Message Queue (Kafka)

Topics: priority-high, priority-low, delayed-notifs.
Configuration: Partition by user ID, replicate for fault tolerance, 7-day retention.
Role: Decouples producers from consumers, supports high throughput.

3. Notification Workers

Consume events, validate preferences, deduplicate (via Redis), check rate limits, and route to senders.
Manual offset commits after successful processing.
Re-enqueue to delayed-notifs if rate limit exceeded.

4. Rate Limiter

When Checked: After worker consumes event, before sending to channel.
Implementation: Redis with sliding window (e.g., 10 SMS/hour/user).
Behavior: If limit exceeded, publish event to delayed-notifs with delay_until timestamp.
Why in Worker: Workers have full context (user ID, channel), and it keeps producers lightweight.

5. Delay Topic

Definition: A Kafka topic (delayed-notifs) for temporarily holding events that exceed rate limits.
Not a Microservice/Storage: Part of the Kafka cluster, leveraging Kafka’s log-based storage.
Operation:
Workers publish events with delay_until and retry_count.
Delay workers consume delayed-notifs, re-enqueue to original topic when delay_until is reached.
Example payload:{
  "event_id": "uuid123",
  "user_id": "user123",
  "channel": "sms",
  "content": { "message": "Your order is shipped!" },
  "priority": "high",
  "delay_until": "2025-10-08T11:26:00Z",
  "retry_count": 1
}




Why Kafka: Scalable, durable, aligns with event-driven architecture.

6. Notification Senders

Push: FCM/APNS, handle device tokens.
Email: SES/SendGrid, support templates.
SMS: Twilio/Nexmo, comply with regulations.
Include retries with exponential backoff.

7. Database and Caching

PostgreSQL: Stores user preferences, device tokens, logs.
Redis: Rate limiting, deduplication (e.g., notif:user_id:event_type with TTL).
Optional MongoDB: For event history.

Addressing Challenges
Reliability

Kafka replication and DLQs for fault tolerance.
Retries with exponential backoff; max 3 attempts before DLQ.
Monitoring with Prometheus for lag/throughput.

Deduplication

Producers generate unique IDs (UUID + user ID + type).
Workers check Redis for recent events within a time window (e.g., 5 minutes).

Prioritization

Use separate Kafka topics (priority-high, priority-low) or priority queues in workers.
Ensure fairness with weighted queuing.

End-to-End Flow

Producer publishes event to Kafka topic (e.g., priority-high).
Worker consumes event, validates preferences, checks deduplication.
Worker checks rate limit in Redis:
If allowed, sends to channel and logs.
If exceeded, publishes to delayed-notifs with delay_until.


Delay worker re-enqueues event to original topic after delay.
Sender delivers notification; logs success or retries/DLQs on failure.

Scalability and Performance

Scaling: Horizontally scale workers and Kafka brokers.
Latency: <1s for high-priority notifications.
Security: Use TLS, API keys, input validation.
Testing: Unit tests, integration tests, chaos engineering.

This design ensures scalability, reliability, and efficient handling of rate-limited events via a Kafka delay topic.