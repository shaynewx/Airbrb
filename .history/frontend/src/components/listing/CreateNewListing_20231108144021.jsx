import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from 'antd';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const FormItem = Form.Item;
const { Option } = Select;
const { Dragger } = Upload;

const CreateNewListing = () => {
    const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    const normFile = (e: any) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    };

    return (
        <>
            <Checkbox
                checked={componentDisabled}
                onChange={(e) => setComponentDisabled(e.target.checked)}
            >
                Form disabled
            </Checkbox>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                onFinish={onFinish}
                disabled={componentDisabled}
                style={{ maxWidth: 600 }}
            >
                <FormItem label="Checkbox" name="checkbox" valuePropName="checked">
                    <Checkbox>Checkbox</Checkbox>
                </FormItem>
                <FormItem label="Radio" name="radio">
                    <Radio.Group>
                        <Radio value="apple"> Apple </Radio>
                        <Radio value="pear"> Pear </Radio>
                    </Radio.Group>
                </FormItem>
                <FormItem label="Input" name="input">
                    <Input />
                </FormItem>
                <FormItem label="Select" name="select">
                    <Select>
                        <Option value="demo">Demo</Option>
                    </Select>
                </FormItem>
                <FormItem label="TreeSelect" name="treeSelect">
                    <TreeSelect
                        treeData={[
                            { title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] },
                        ]}
                    />
                </FormItem>
                <FormItem label="Cascader" name="cascader">
                    <Cascader
                        options={[
                            {
                                value: 'zhejiang',
                                label: 'Zhejiang',
                                children: [
                                    {
                                        value: 'hangzhou',
                                        label: 'Hangzhou',
                                    },
                                ],
                            },
                        ]}
                    />
                </FormItem>
                <FormItem label="DatePicker" name="datePicker">
                    <DatePicker />
                </FormItem>
                <FormItem label="RangePicker" name="rangePicker">
                    <RangePicker />
                </FormItem>
                <FormItem label="InputNumber" name="inputNumber">
                    <InputNumber />
                </FormItem>
                <FormItem label="TextArea" name="textArea">
                    <TextArea rows={4} />
                </FormItem>
                <FormItem label="Switch" name="switch" valuePropName="checked">
                    <Switch />
                </FormItem>
                <FormItem label="Upload" name="upload" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Dragger name="files" action="/upload.do">
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                            band files
                        </p>
                    </Dragger>
                </FormItem>
                <FormItem wrapperCol={{ span: 14, offset: 4 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </FormItem>
            </Form>
        </>
    );
};
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const FormDisabledDemo: React.FC = () => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

  return (
    <>
      <Checkbox
        checked={componentDisabled}
        onChange={(e) => setComponentDisabled(e.target.checked)}
      >
        Form disabled
      </Checkbox>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        disabled={componentDisabled}
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="Checkbox" name="disabled" valuePropName="checked">
          <Checkbox>Checkbox</Checkbox>
        </Form.Item>
        <Form.Item label="Radio">
          <Radio.Group>
            <Radio value="apple"> Apple </Radio>
            <Radio value="pear"> Pear </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Input">
          <Input />
        </Form.Item>
        <Form.Item label="Select">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="TreeSelect">
          <TreeSelect
            treeData={[
              { title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] },
            ]}
          />
        </Form.Item>
        <Form.Item label="Cascader">
          <Cascader
            options={[
              {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                  {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="DatePicker">
          <DatePicker />
        </Form.Item>
        <Form.Item label="RangePicker">
          <RangePicker />
        </Form.Item>
        <Form.Item label="InputNumber">
          <InputNumber />
        </Form.Item>
        <Form.Item label="TextArea">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Switch" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item label="Button">
          <Button>Button</Button>
        </Form.Item>
        <Form.Item label="Slider">
          <Slider />
        </Form.Item>
      </Form>
    </>
  );
};

export default () => <FormDisabledDemo />;
