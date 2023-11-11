import React from 'react';
import { Card } from 'antd';
const { Meta } = Card;

const Cards = () => (
  <Card
    hoverable
    style={{
      width: 240,
    }}
    cover={
        <Carousel afterChange={onChange}>
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
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>
);
export default Cards;
