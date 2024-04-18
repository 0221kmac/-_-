import axios from "axios";
import { API_SERVER_HOST } from "./rootApi";
import jwtAxios from "../utils/jwtUtil";

const host = `${API_SERVER_HOST}/community`;

// 게시글 리스트
export const communityList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${host}/list`, {
    params: { page: page, size: size },
  });

  return res.data;
};

// 게시글 등록
export const regCommunity = async (community) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await jwtAxios.post(`${host}/register`, community, header);

  return res.data;
};

// 게시글 상세보기
export const getCommunity = async (communityBno, page, size) => {
  const res = await jwtAxios.get(`${host}/read/${communityBno}`, {
    params: {
      page: page,
      size: size,
    },
  });

  return res.data;
};

// 게시글 수정
export const modCommunity = async (communityBno, data) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await jwtAxios.put(`${host}/${communityBno}`, data, header);

  return res.data;
};

// 게시글 삭제
export const delCommunity = async (communityBno) => {
  const res = await jwtAxios.delete(`${host}/${communityBno}`);

  return res.data;
};

//******** Reply  *************/

// 댓글 리스트
export const getReplies = async (communityBno, page, size) => {
  const res = await axios.get(`${host}/reply/list/${communityBno}`, {
    params: {
      page: page,
      size: size,
    },
  });
  return res.data;
};

// 댓글 등록
export const regReply = async (communityBno, reply) => {
  const res = await jwtAxios.post(
    `${host}/reply/register/${communityBno}`,
    reply
  );
  return res.data;
};

// 댓글 수정
export const modReply = async (replyRno, reply) => {
  const res = await jwtAxios.put(`${host}/reply/${replyRno}`, reply);
  return res.data;
};

// 댓글 삭제
export const delReply = async (replyRno) => {
  const res = await jwtAxios.delete(`${host}/reply/${replyRno}`);
  return res.data;
};
