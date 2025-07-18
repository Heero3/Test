// Example module for tic-tac-toe game
export default function bar() {
  console.log('Module loaded successfully!');
  
  // Test function
  function testModule() {
    console.log('Module test passed!');
    return true;
  }
  
  return testModule();
}
