export default function CharacterPage({ params }: { params: { characterId: string } }) {
  return <section className="flex h-full w-full items-center justify-center">{params.characterId}</section>;
}
