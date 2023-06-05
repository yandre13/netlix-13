export default function Overlay({ id }: { id?: string }) {
  return (
    <div
      className="Overlay fixed left-0 top-0 -z-10 h-full w-full bg-black bg-opacity-50 opacity-0"
      id={id}
    />
  )
}
