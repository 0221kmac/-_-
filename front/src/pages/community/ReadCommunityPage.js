import { useParams } from "react-router-dom";
import ReadCommunityComponent from "../../components/community/ReadCommunityComponent";
import BasicMenu from "../../components/menus/BasicMenu";
import ReplyListComponent from "../../components/community/ReplyListComponent";

const ReadCommunityPage = () => {
  const { communityBno } = useParams();

  return (
    <div className="w-full bg-white">
      <BasicMenu />
      <div className="text-3xl font-extrabold">커뮤니티</div>

      <ReadCommunityComponent communityBno={communityBno} />
      {/* <ReplyListComponent communityBno={communityBno} /> */}
    </div>
  );
};

export default ReadCommunityPage;
