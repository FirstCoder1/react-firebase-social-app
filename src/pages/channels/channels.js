import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { Comment, Avatar, Card, Form , Input, Row, Col, Button, Tooltip, Empty } from 'antd';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import * as moment from 'moment';
import { Replies } from './Replies';
const { TextArea } = Input;



export function Channels(props){
    const {channel, user} = props;

    const postsQuery = {
        collection : "posts",
        where : [ "channelId" , "==", channel.id ]
    }

    const channelQuery = {
        collection : "channels",
    }

    const fs = useFirestore();

   useFirestoreConnect(() => [postsQuery]);
   const {posts, channels} = useSelector(state => state.firestore.data);

   const [ selectedPost, selectPost ] = useState(null);


    React.useEffect(() => {
        selectPost(null);
    },[channel]);

    function submitPost(values){
        values.channelId = channel.id;
        values.postedBy = user.displayName;
        values.postDate = new Date().toString();
        values.postedByEmail = user.email;
        fs.collection('posts').add(values);
        postForm.resetFields();
    }

    const [ postForm ] = Form.useForm();
    return(
        
            channel != null  ? 
            <Card title={channel.name}>
                <Row>
                    <Col span={8}>
                    <Form form={postForm} layout='vertical' onFinish={submitPost}>
                    <Form.Item name={'title'} label={"Title"} rules={[{ required : true, message : "Please add title "}]}>
                        <Input placeholder="input with clear icon" allowClear/>

                    </Form.Item>
                    <Form.Item name={'description'} label={"Description"} rules={[{ required : true, message : "Please add description "}]}>
                    <TextArea placeholder="textarea with clear icon" allowClear  />

                    </Form.Item>
                    <Form.Item>
                        <Button htmlType='submit'>Post</Button>
                    </Form.Item>
                </Form>

                    </Col>
                    <Col span={8}>
                    { 
                        posts != null && Object.keys(posts).length > 0 ?
                        Object.keys(posts).sort((b,a) => new Date(posts[a].postDate) -new Date(posts[b].postDate)  ).map((i) => {
                            var values = posts[i];
                            
                            return ( 
                                <Comment
                                actions={[<span onClick={() => {
                                        selectPost({ ...values, id : i})
                                }}>Show Replies</span>]}
                                author={<a>{values.postedBy}</a>}
                                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                                content={<>
                                    <p>{values.title}</p>
                                    <p>
                                   {values.description}
                                    </p></>
                                }
                                datetime={
                                    <Tooltip title={moment(values.postDate).format('YYYY-MM-DD HH:mm:ss')}>
                                    <span> {} {moment(values.postDate).fromNow()}</span>
                                    </Tooltip>
                                }
                                />
                            )
                        }) : <Empty description={<span>No Posts Yet</span>}  />
                    }
         
                    </Col>
                    {
                        selectedPost != null ?    <Col span={8}>
                        <Replies {...props} post={selectedPost} />
  
                      </Col> : null
                    }
                   
                    
                </Row>

            </Card>

            : null
        

    )
}

