import React from 'react';
import { Button, Card } from 'antd';
import house from '../../components/img/house.svg'

function editListing () {
  // TODO: 编辑房源信息
  console.log('edit listing');
}

function deleteListing () {
  // TODO:删除房源信息
  console.log('delete listing');
}

fuc

const Cards = () => (
  <Card
    hoverable
    style={{
      width: 300,
    }}
    cover={
      <img
        alt="Thumbnail"
        src={house}
        />
    }
  >
    {/* //TODO: */}
    <p>房源信息</p>
    <Button type="primary" style={{ margin: '5px' }} onClick={editListing}>Edit</Button>
    <Button style={{ margin: '5px' }} onClick={deleteListing}>Delete</Button>
    <Button style={{ margin: '5px' }}>Publish</Button>

  </Card>
);
export default Cards;
