import { useQuery } from 'react-query';
import Layout from 'components/Layout/Layout';
import { http } from 'http/client';

const About = () => {
  const query = useQuery('posts', async () => {
    return await http.get('/api/posts');
  });

  return (
    <Layout>
      <div>About</div>
      {query.isLoading ? (
        <div>Loading</div>
      ) : (
        <code>{JSON.stringify(query.data, null, 2)}</code>
      )}
    </Layout>
  );
};

export default About;
