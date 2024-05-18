'use server';

const baseUrl =
  process.env.COMPONENTS_REGISTRY_URL ?? 'https://auth-rush.vercel.app/';
export async function fetchingData() {
  const data = await getRegistryIndex();
  const allData = await fetchTree(data);
  //   const data = await response.json();

  return allData;
}
export async function getRegistryIndex() {
  try {
    const [result] = await fetchRegistry(['index.json']);

    return result;
  } catch (error) {
    throw new Error(`Failed to fetch components from registry. ${error}`);
  }
}
export async function fetchJson(file: string) {
  try {
    const path = `defaults/${file}.json`;
    console.log(path);
    const data = await fetchRegistry([path]);
    return data[0];
  } catch (error) {
    console.log(error);
  }
}
async function fetchRegistry(paths: string[]) {
  try {
    const results = await Promise.all(
      paths.map(async (path) => {
        const response = await fetch(`${baseUrl}/registry/${path}`);
        const data = await response.json();
        return data;
      })
    );

    return results;
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to fetch registry from ${baseUrl}.`);
  }
}

export async function componentNames() {
  try {
    const data = await getRegistryIndex();
    return data.map((item: { name: string }) => item.name);
  } catch (error) {
    console.log(error);
  }
}

export async function fetchTree(tree: any[]) {
  try {
    const paths = tree.map((item) => `defaults/${item.name}.json`);

    const result = await fetchRegistry(paths);
    if (!result) {
      console.log(`No result found for ${paths}`);
    }

    return result;
  } catch (error) {
    throw new Error(`Failed to fetch tree from registry ${baseUrl}.`);
  }
}
