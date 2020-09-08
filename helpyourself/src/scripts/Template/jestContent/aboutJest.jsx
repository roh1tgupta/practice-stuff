import React from 'react';

export default function AboutJest() {
  return (
    <div>
      <h2>Jest</h2>
      <p> Jest — a testing framework maintained by Facebook.
        This can be used to test any JavaScript applications. However, 
        some of the features it provides come in really handy for testing user 
        interfaces, which is why it’s a great fit for React.</p>
      
      <p>It is fast and easy to use, can perform snapshot testing. It provides
        out of box solutions with no dependency to other testing library.
      </p>
      <p><b>As per jest core team: </b><br />
        "Jest is a JavaScript testing framework designed to ensure correctness
        of any JavaScript codebase. It allows you to write tests with an approachable,
        familiar and feature-rich API that gives you results quickly. <br />
        Jest is well-documented, requires little configuration and can be extended 
        to match your requirements.
        Jest makes testing delightful."
      </p>
    </div>
  );
}
