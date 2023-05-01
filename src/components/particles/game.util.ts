import { Meteor, Tiles } from "../../types/game";

export const getStartingTiles = (): Tiles => {
  return {
    0: {
      clock: 0,
      health: 14,
      order: 5,
      placement: [],
    },
    1: {
      clock: 1,
      health: 3,
      order: 6,
      placement: [],
    },
    3: {
      clock: 3,
      health: 3,
      order: 9,
      placement: [],
    },
    5: {
      clock: 5,
      health: 3,
      order: 8,
      placement: [],
    },
    6: {
      clock: 6,
      health: 3,
      order: 7,
      placement: [],
    },
    7: {
      clock: 7,
      health: 3,
      order: 4,
      placement: [],
    },
    9: {
      clock: 9,
      health: 3,
      order: 1,
      placement: [],
    },
    11: {
      clock: 11,
      health: 3,
      order: 2,
      placement: [],
    },
    12: {
      clock: 12,
      health: 3,
      order: 3,
      placement: [],
    },
  };
};

export const getInitialHardPath = (): Meteor[] => {
  return [
    {
      type: "YELLOW",
      clock: 6,
    },
    {
      type: "BLUE",
      clock: 6,
    },
    {
      type: "BLUE",
      clock: 7,
    },
    {
      type: "BLUE",
      clock: 9,
    },
    {
      type: "BLUE",
      clock: 11,
    },
    {
      type: "BLUE",
      clock: 12,
    },
    {
      type: "BLUE",
      clock: 1,
    },
    {
      type: "BLUE",
      clock: 1,
    },
  ];
};
