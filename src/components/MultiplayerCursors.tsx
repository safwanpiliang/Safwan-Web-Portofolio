"use client";

import { FakeCursor } from "./FakeCursor";

const MULTIPLAYER_CURSORS = [
  {
    id: "safwan",
    cursorImage: "/source_image/Cursor%20Safwan.svg",
    cursorArrowImage: "/source_image/Cursor%20Safwan%20Arrow.svg",
    themeColor: "#4F46E5",
    initialDelay: 0,
    messages: [
      "Cok laper dah",
      "web gweh keren bet jir awokaowok",
      "Eh anu",
      "lu ngapain dah mondar mandir bae",
      "Welcome to my web porto ygy"
    ]
  },
  {
    id: "fuhim",
    cursorImage: "/source_image/Cursor%20Amber.svg",
    cursorArrowImage: "/source_image/Cursor%20Amber%20Arrow.svg",
    themeColor: "#ffab2f",
    initialDelay: 3000,
    messages: [
      "Meksens",
      "Keren juga web lu wann",
      "Anjaayy ini lu yang buat wan",
      "Woi wann",
      "Info tutor puh sepuhh",
      "Geloyy"
    ]
  }
];

export function MultiplayerCursors() {
  return (
    <>
      {MULTIPLAYER_CURSORS.map((config) => (
        <FakeCursor
          key={config.id}
          cursorImage={config.cursorImage}
          cursorArrowImage={config.cursorArrowImage}
          themeColor={config.themeColor}
          initialDelay={config.initialDelay}
          messages={config.messages}
        />
      ))}
    </>
  );
}
