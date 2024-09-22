const Page = ({ children }: { children: JSX.Element }) => {
  return <div className="bg-gray-50 p-4 w-full h-fit rounded-md">
    { children }
  </div>
}

export default Page;