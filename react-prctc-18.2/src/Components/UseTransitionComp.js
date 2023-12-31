import { useState, useTransition , memo} from 'react';

export default function TabContainer() {
  const [tab, setTab] = useState('about');
  return (
    <>
      <TabButton
        isActive={tab === 'about'}
        onClick={() => setTab('about')}
      >
        About
      </TabButton>
      <TabButton
        isActive={tab === 'posts'}
        onClick={() => setTab('posts')}
      >
        Posts (slow)
      </TabButton>
      <TabButton
        isActive={tab === 'contact'}
        onClick={() => setTab('contact')}
      >
        Contact
      </TabButton>
      <hr />
      {tab === 'about' && <AboutTab />}
      {tab === 'posts' && <PostsTab />}
      {tab === 'contact' && <ContactTab />}
    </>
  );
}

function TabButton({ children, isActive, onClick }) {
    const [isPending, startTransition] = useTransition();
    if (isActive) {
      return <b>{children}</b>
    }
    if (isPending) {
      return <b className="pending">{children}</b>;
    }
    return (
      <button onClick={() => {
        console.log(1)
        startTransition(() => {
            console.log(2)
            onClick();
        });
        console.log(3)
      }}>
        {children}
      </button>
    );
  }

function AboutTab() {
    return (
      <p>Welcome to my profile!</p>
    );
  }
  

const PostsTab = memo(function PostsTab() {
    // Log once. The actual slowdown is inside SlowPost.
    console.log('[ARTIFICIALLY SLOW] Rendering 500 <SlowPost />');
  
    let items = [];
    for (let i = 0; i < 5000; i++) {
      items.push(<SlowPost key={i} index={i} />);
    }
    return (
      <ul className="items">
        {items}
      </ul>
    );
  });
  
function SlowPost({ index }) {
    let startTime = performance.now();
    while (performance.now() - startTime < 1) {
      // Do nothing for 1 ms per item to emulate extremely slow code
    }
  
    return (
      <li className="item">
        Post #{index + 1}
      </li>
    );
  }


function ContactTab() {
    return (
      <>
        <p>
          You can find me online here:
        </p>
        <ul>
          <li>admin@mysite.com</li>
          <li>+123456789</li>
        </ul>
      </>
    );
  }