import React from 'react';
import { Button, Card, Carousel } from 'antd';

function editListing () {
  
  console.log('edit listing');
}

function deleteListing () {
  console.log('delete listing');
}

const contentStyle = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const Cards = () => (
  <Card
    hoverable
    style={{
      width: 240,
    }}
    cover={
    <Carousel>
      <div>
        <h3 style={contentStyle}>1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
    }
  >
    <p>房源信息</p>
    <Button type="primary" style={{ margin: '5px' }} onClick={editListing}>Edit</Button>
    <Button style={{ margin: '5px' }} onClick={deleteListing}>Delete</Button>

  </Card>
);
export default Cards;
