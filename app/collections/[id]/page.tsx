import { COLLECTIONS_EXTENDED } from '@/lib/collections'
import CollectionDetailClient from './CollectionDetailClient'

export function generateStaticParams() {
  return COLLECTIONS_EXTENDED.map(c => ({ id: c.id }))
}

export default async function CollectionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <CollectionDetailClient id={id} />
}
