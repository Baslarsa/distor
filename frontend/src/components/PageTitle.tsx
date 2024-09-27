const PageTitle = ({ title }: { title: string }) => {
  return (
    <div>
      <h2 className="text-2xl mt-2 mb-4 font-semibold">{title}</h2>
    </div>
  );
};

export default PageTitle;
