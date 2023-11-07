import React from 'react';
import { Button, Flex } from 'antd';
const App = () => (
  <Flex gap="small" wrap="wrap">
    <Button type="primary">Submit</Button>
    <Button>Cancel</Button>
  </Flex>
);
export default App;
