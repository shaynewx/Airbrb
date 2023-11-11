import React from 'react';
import { Button, Card } from 'antd';
import house from './components/img/'

function editListing () {
  // TODO: 编辑房源信息
  console.log('edit listing');
}

function deleteListing () {
  // TODO:删除房源信息
  console.log('delete listing');
}

// const contentStyle = {
//   margin: 0,
//   height: '160px',
//   color: '#fff',
//   lineHeight: '160px',
//   textAlign: 'center',
//   background: '#364d79',
// };

const Cards = () => (
  <Card
    hoverable
    style={{
      width: 240,
    }}
    cover={
      <img
        alt="Thumbnail"
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
    }
  >
    {/* //TODO: */}
    <p>房源信息</p>
    <Button type="primary" style={{ margin: '5px' }} onClick={editListing}>Edit</Button>
    <Button style={{ margin: '5px' }} onClick={deleteListing}>Delete</Button>

  </Card>
);
export default Cards;
