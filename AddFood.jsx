import {
    AutoComplete,
    Button,
    Cascader,
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Radio,
    Rate,
    Slider,
    Switch,
    Upload,
  } from 'antd';
  import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
  import categoryService from "../Service/CategoryService";
  import foodService from "../Service/FoodService";
  import React, { useState } from 'react';
  import 'antd/dist/antd.css';
import { useEffect } from 'react';
import axios from 'axios';
  const { Option } = Select;
  const normFile = (e) => {
    console.log('Upload event:', e);
  
    if (Array.isArray(e)) {
      return e;
    }
  
    return e?.fileList;
  };
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  
  const AddFood = () => {
    const [form] = Form.useForm();
    const [isRedirectSuccess,setisRedirectSuccess] = useState(false);
    const [isLoading, serisLoading] = useState(false);
    // const [content, setcontent] = useState("");
    const [categoryList, setCategoryList] = useState([]);
    const [foodList, setFoodList] = useState([]);
    const[status,setStatus] = useState("");
    const[category,setCategory] = useState("");
    const[id,setId] = useState("");
    const[name,setName] = useState("");
    const[slug,setSlug] = useState("");
    const[description,setDescription] = useState("");
    const[price,setPrice] = useState(0);
    const[image,setImage] = useState("");
    

    const _setValue = (ev, key) => {
      ev.persist();
      this.setState(prevState => {
          prevState.form.dirty = false;
          prevState.form[key] = {
              value: ev.target.value,
              err: this._getInvalidErr(ev.target),
          }
          return prevState;
      });
  }

    const [foodStatus] = useState([
        {
            key:1,
            type:"SALE"
          },
          {
            key:2 ,
            type: "UNSALE"
          },
          {
            key:-1,
            type: "DELETED"
          },
          
          {
            key: -2,
            type: "STOP"
          },
    ])

    useEffect(() =>{
        getCategoryList();
        
    },[])
    
    const getCategoryList = async () =>{
        await categoryService
        .getCategoryList()
        .then((res) =>{
            setCategoryList(res.data);
            console.log("999999999999999", res.data)
        })
        .catch((err) => {
            console.log(err);
          });
          
    }

    const handleChangeStatus = (ev) =>{
        setStatus(ev.target.value)
        
    }
    const handleChangeCategory = (ev) =>{
        setCategory(ev.target.value)
        
    }
  
    const onFinish = async (values) => {
        let dataConverted = {
            Id: values.id,
            Name: values.name,
            Slug: values.slug,
            Description: values.description,
            Category: values.category,
            Status: values.status,
            Price: values.price,
            Image: values.image,
          };
          console.log(dataConverted)
          // await foodService
          //   .createNew(dataConverted)
          //   .then((res) => {
          //     console.log(res.data);
          //     setisRedirectSuccess(true);
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //   });
          axios.post(`https://order-foods.herokuapp.com/api/v1/foods/create`)
          .then(res => {
            console.log(res);
            console.log(res.data);
          })
    
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };
    
    const suffixSelector = (
      <Form.Item name="suffix" noStyle>
        <Select
          style={{
            width: 70,
          }}
        >
          <Option value="USD">$</Option>
          <Option value="CNY">¥</Option>
        </Select>
      </Form.Item>
    );
   
    return (
      
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86',
        }}
        scrollToFirstError
      >
         <Form.Item
         id = "id"
        label="Id"
        name="id"
        value = {id.value}
        onChange = {(ev) => this._setValue(ev, 'id')}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        id = "name"
        label="name"
        name="name"
        value = {name.value}
        onChange = {(ev) => this._setValue(ev, 'name')}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        id = "slug"
        label="slug"
        name="slug"
        value = {slug.value}
        onChange = {(ev) => this._setValue(ev, 'slug')}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

        <Form.Item
          id = "price"
          name="price"
          value={price.value}
          label="Price"
        
          onChange = {(ev) => this._setValue(ev, 'price')}
          rules={[
            {
              required: true,
              message: 'Please input donation amount!',
            },
          ]}
        >
          <InputNumber
            addonAfter={suffixSelector}
            style={{
              width: '100%',
            }}
          />
        </Form.Item>
  
        <Form.Item
          id = "description"
          name="description"
          label="description"
          value = {description.value}
          onChange = {(ev) => this._setValue(ev, 'description')}
          rules={[
            {
              required: true,
              message: 'Please input Intro',
            },
          ]}
        >
          <Input.TextArea showCount maxLength={100} />
        </Form.Item>
  
        <Form.Item
          id = "category"
          name="category"
          label="Category"
          value = {category}
          onChange={handleChangeCategory}
        >
          <Select placeholder="select category">
            {categoryList.Pageable?.content.map((item) =>(
                <Option key={item.id} value = {item.id}>{item.name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          id = "status"
          name="status"
          label="Status"
          value = {status}
          onChange={handleChangeStatus}
        >
          <Select placeholder="select status">
            {foodStatus.map((item,index) =>(
                <Option key={index} value = {item.id}>{item.type}</Option>
            ))}
          </Select>
        </Form.Item>

      <Form.Item
        name="image"
        label="image"
        value ={image.value}
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>
  
    
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  };
  
  export default AddFood;