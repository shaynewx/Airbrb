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

const Cards = () => (
  <Card
    hoverable
    style={{
      width: 240,
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

  </Card>
);
export default Cards;
