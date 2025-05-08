import { revalidateTag, revalidatePath } from 'next/cache';

export default async function handler(req, res) {
  const { secret, path, tag } = req.query;

  if (secret !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    if (path) {
      await revalidatePath(path); // Revalidate specific path
      return res.json({ revalidated: true, path });
    }
    if (tag) {
      await revalidateTag(tag); // Revalidate by tag
      return res.json({ revalidated: true, tag });
    }
    return res.status(400).json({ message: 'Path or tag required' });
  } catch (err) {
    return res.status(500).json({ message: 'Error revalidating' });
  }
}
