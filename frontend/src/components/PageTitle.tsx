const PageTitle = ({ title }: { title: string }) => {
  return (
    <div>
      <h2 className="text-2xl my-2 font-semibold">{title}</h2>
    </div>
  );
};

export default PageTitle;
