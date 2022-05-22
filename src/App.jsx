import PostsList from './features/posts/PostsList';
import AddPostForm from './features/posts/AddPostFrom';

function App() {
  return (
    <main>
      <AddPostForm />

      <section>
        <h2>Posts</h2>
        <PostsList />
      </section>
    </main>
  );
}

export default App;
