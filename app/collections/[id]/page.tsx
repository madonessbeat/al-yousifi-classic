import { COLLECTIONS_EXTENDED } from '@/lib/collections'
import CollectionDetailClient from './CollectionDetailClient'

export function generateStaticParams() {
  return COLLECTIONS_EXTENDED.map(c => ({ id: c.id }))
}

export default function CollectionDetailPage({ params }: { params: { id: string } }) {
  return <CollectionDetailClient id={params.id} />
}
