var i = 0;
export default function timedCount() {
    console.log("demo wokrdre...hello from inside.", i)
  i = i + 1;
  console.log("demo wokrdre....", i)
  postMessage(i);
  setTimeout("timedCount()",100);
}
