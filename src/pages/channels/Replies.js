import React from 'react';
import { Comment, Avatar, Card, Button, Tooltip, Input, Empty } from 'antd';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import * as moment from 'moment';

const { TextArea } = Input;
export function Replies(props) {
    const { post, user, channel } = props;
    const [reply, setReply] = React.useState('');

    const replyQuery = {
        collection: "replies",
        where: ["postId", "==", post.id]
    };

    const fs = useFirestore();

    useFirestoreConnect(() => [replyQuery]);
    const { posts, channels, replies } = useSelector(state => state.firestore.data);

    function giveReply() {
        var data = {
            text: reply,
            postedBy: user.displayName,
            postDate: new Date().toString(),
            postedByEmail: user.email,
            postId: post.id
        };
        fs.collection("replies").add(data);
        setReply('');
    }
    return (
        <Card title={post.title}>
            <p>{post.description}</p>
            <TextArea value={reply} placeholder="Enter your reply here" allowClear onChange={(e) => setReply(e.target.value)} />
            <Button onClick={giveReply}>Reply</Button>

            {replies != null && Object.keys(replies).length > 0 ?
                Object.keys(replies).sort((b, a) => new Date(replies[a].postDate) - new Date(replies[b].postDate)).map((i) => {
                    var values = replies[i];

                    return (
                        <Comment
                            author={<a>{values.postedBy}</a>}
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                            content={<p>
                                {values.text}
                            </p>}
                            datetime={<Tooltip title={moment(values.postDate).format('YYYY-MM-DD HH:mm:ss')}>
                                <span>  {moment(values.postDate).fromNow()}</span>
                            </Tooltip>} />
                    );
                }) : <Empty description={<span>No Replies</span>} />}
        </Card>
    );
}
