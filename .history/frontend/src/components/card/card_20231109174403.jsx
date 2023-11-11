import React from 'react';
import { Card, Carousel } from 'antd';
const { Meta } = Card;

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
    <div>房源信息</div>
    <Meta title="Title" description="www.instagram.com" />
  </Card>
);
export default Cards;
