import { redirect } from "next/navigation";

const Page = () => {
  /**
       Directly re-directing to the Hero Page as per the requirements of the project.
       Could be expanded to include a more generic landing page.
    **/
  redirect("/hero");
  return <></>;
};

export default Page;
