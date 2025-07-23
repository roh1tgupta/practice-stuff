import { useState, useTransition , memo, useDeferredValue, useEffect} from 'react';

const Tabs = memo(function ({tab}) {
 console.log(tab)
  return <>
  {tab === 'about' && <AboutTab />}
      {tab === 'posts' && <PostsTab />}
      {tab === 'contact' && <ContactTab />}
      </>

})


// useDeferredValue defers the UI update that depends on the value — not the value itself.
//So even though your state (query) updates immediately, any part of the UI that uses the deferred 
// version (deferredQuery) will update more slowly — only when React thinks it's a good time 
// (i.e., during idle or low-priority time)




export default function TabContainer() {
  const [tab, setTab] = useState('about');
  const tab1 = useDeferredValue(tab)
  // const [tab1, setTab1] = useState(tab);
  // useEffect(() => {
  //   setTab1(tab)
  // }, [tab])

  // const tab1 = tab;
  // console.log(tab1, "...tab1")
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
      <Tabs tab={tab1}/>
    </>
  );
}

function TabButton({ children, isActive, onClick }) {
    if (isActive) {
      return <b>{children}</b>
    }
   
    return (
      <button onClick={() => {
        console.log(1)
       onClick()
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
    // console.log('[ARTIFICIALLY SLOW] Rendering 500 <SlowPost />');
  
    let items = [];
    for (let i = 0; i < 9000; i++) {
      console.log('lops')
      items.push(<SlowPost key={i} index={i} />);
    }
    // console.log('[ARTIFICIALLY SLOW] Rendering 500 <SlowPost /> after for loop');
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