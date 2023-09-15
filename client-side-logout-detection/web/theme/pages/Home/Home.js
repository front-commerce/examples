import React from "react";
import { BodyParagraph } from "theme/components/atoms/Typography/Body";
import { H2 } from "theme/components/atoms/Typography/Heading";
import Link from "theme/components/atoms/Typography/Link";

const Home = () => {
  return (
    <div className="container">
      <H2>Test an unexpected logout</H2>

      <BodyParagraph>
        This page allows you to simulate an unexpected logout. For instance,
        when the token assigned to your user expires on remote system.
        <br />
        Users will be logged out without an explicit intent, which could break
        their navigation on your website.
      </BodyParagraph>
      <BodyParagraph>
        This example illustrates how you could monitor this event and act on it.
        <br />
        Click the link below to simulate a navigation to a new page that will
        logout the user unexpectedly when fetching data.
      </BodyParagraph>

      <BodyParagraph>
        <Link buttonAppearance="default" to="/forceLogout">
          Simulate logout
        </Link>
      </BodyParagraph>
    </div>
  );
};

export default Home;
