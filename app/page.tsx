import { fetchingData } from '@/actions/feching-data';
import Tranformer from '@/components/Tranformer';

export default async function Home() {
  const data = await fetchingData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5">
      <Tranformer />
    </main>
  );
}
