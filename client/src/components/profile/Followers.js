import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";
import { useParams } from "react-router";
import Avatar from "../Tweet/Avatar";

const Followers = () => {
  const user = useParams().profile;
  const [listOfFollowers, setListOfFollowers] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`/api/${user}/followers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setListOfFollowers([...data.followers]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  return (
    <>
      <FollowersWrapper>
        {listOfFollowers.map((follower) => {
          return (
            <Mapped key={follower.handle}>
              <AvatarDiv>
                <Avatar
                  src={follower.avatarSrc}
                  width="50"
                  alt={follower.handle}
                />
              </AvatarDiv>
              <Details>
                <Bold>{follower.displayName}</Bold>
                <GreyText>@{follower.handle}</GreyText>
                <p>{follower.bio}</p>
              </Details>
              <FollowButton>Follow</FollowButton>
            </Mapped>
          );
        })}
      </FollowersWrapper>
    </>
  );
};

const FollowersWrapper = styled.div`
  border-top: 1px solid ${COLORS.grayBorder};
`;

const Mapped = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid ${COLORS.grayBorder};
`;

const AvatarDiv = styled.div`
  padding: 10px;
`;

const Details = styled.div`
  padding: 10px;
  width: 100%;
`;

const Bold = styled.p`
  font-weight: bold;
`;

const GreyText = styled.p`
  color: ${COLORS.grayText};
  margin-bottom: 6px;
`;

const FollowButton = styled.div`
  border-radius: 10px;
  background-color: ${COLORS.primary};
  color: #fff;
  padding: 10px;
  font-size: 1rem;
  font-weight: bold;
`;

export default Followers;
