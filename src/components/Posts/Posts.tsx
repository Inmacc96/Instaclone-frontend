import { Grid } from "semantic-ui-react";
import { Post } from "../../__generated__/graphql";
import PreviewPost from "./PreviewPost";
import "./Posts.scss";

interface PostsProps {
  posts: Post[];
}

const Posts = ({ posts }: PostsProps) => {
  return (
    <div className="posts">
      <h1>Posts</h1>
      <Grid columns={4}>
        {posts.map((post) => (
          <Grid.Column key={post.id}>
            <PreviewPost post={post} />
          </Grid.Column>
        ))}
      </Grid>
    </div>
  );
};

export default Posts;
