export enum Elements {
    // Empty space - where the hero can move.
    NONE = ' ',

    // A wall where you can shoot a hole.
    BRICK = '#',

    // The wall is restored over time. When the process begins, we
    // see a timer.
    PIT_FILL_1 = '1',

    // The wall is restored over time. When the process begins, we
    // see a timer.
    PIT_FILL_2 = '2',

    // The wall is restored over time. When the process begins, we
    // see a timer.
    PIT_FILL_3 = '3',

    // The wall is restored over time. When the process begins, we
    // see a timer.
    PIT_FILL_4 = '4',

    // Indestructible wall - It cannot be destroyed with a shot.
    STONE = '☼',

    // At the moment of the shot, we see the wall like this.
    CRACK_PIT = '*',

    // Clue knife. Collect a series of clues to get the maximum
    // points.
    CLUE_KNIFE = '$',

    // Clue glove. Collect a series of clues to get the maximum
    // points.
    CLUE_GLOVE = '&',

    // Clue ring. Collect a series of clues to get the maximum
    // points.
    CLUE_RING = '@',

    // Your hero is dead. In the next tick, it will disappear and
    // appear in a new location.

    HERO_DIE = 'O',
    // Your hero is climbing the ladder.

    HERO_LADDER = 'A',
    // Your hero runs to the left.

    HERO_LEFT = '◄',

    // Your hero runs to the right.
    HERO_RIGHT = '►',

    // Your hero is falling.
    HERO_FALL = 'U',

    // Your hero is crawling along the pipe.
    HERO_PIPE = 'I',

    // Your hero in the pit.
    HERO_PIT = 'E',

    // Your shadow-hero is dead. In the next tick, it will
    // disappear and appear in a new location.
    HERO_MASK_DIE = 'o',

    // Your shadow-hero is climbing the ladder.
    HERO_MASK_LADDER = 'a',

    // Your shadow-hero runs to the left.
    HERO_MASK_LEFT = 'h',

    // Your shadow-hero runs to the right.
    HERO_MASK_RIGHT = 'w',

    // Your shadow-hero is falling.
    HERO_MASK_FALL = 'u',

    // Your shadow-hero is crawling along the pipe.
    HERO_MASK_PIPE = 'i',

    // Your shadow-hero in the pit.
    HERO_MASK_PIT = 'e',

    // Other hero is dead. In the next tick, it will disappear and
    // appear in a new location.
    OTHER_HERO_DIE = 'C',

    // Other hero is climbing the ladder.
    OTHER_HERO_LADDER = 'D',

    // Other hero runs to the left.
    OTHER_HERO_LEFT = '«',

    // Other hero runs to the right.
    OTHER_HERO_RIGHT = '»',

    // Other hero is falling.
    OTHER_HERO_FALL = 'F',

    // Other hero is crawling along the pipe.
    OTHER_HERO_PIPE = 'J',

    // Other hero in the pit.
    OTHER_HERO_PIT = 'K',

    // Other shadow-hero is dead. In the next tick, it will
    // disappear and appear in a new location.
    OTHER_HERO_MASK_DIE = 'c',

    // Other shadow-hero is climbing the ladder.
    OTHER_HERO_MASK_LADDER = 'd',

    // Other shadow-hero runs to the left.
    OTHER_HERO_MASK_LEFT = 'Z',

    // Other shadow-hero runs to the right.
    OTHER_HERO_MASK_RIGHT = 'z',

    // Other shadow-hero is falling.
    OTHER_HERO_MASK_FALL = 'f',

    // Other shadow-hero is crawling along the pipe.
    OTHER_HERO_MASK_PIPE = 'j',

    // Other shadow-hero in the pit.
    OTHER_HERO_MASK_PIT = 'k',

    // Enemy hero is dead. In the next tick, it will disappear and
    // appear in a new location.
    ENEMY_HERO_DIE = 'L',

    // Enemy hero is climbing the ladder.
    ENEMY_HERO_LADDER = 'N',

    // Enemy hero runs to the left.
    ENEMY_HERO_LEFT = 'P',

    // Enemy hero runs to the right.
    ENEMY_HERO_RIGHT = 'Q',

    // Enemy hero is falling.
    ENEMY_HERO_FALL = 'R',

    // Enemy hero is crawling along the pipe.
    ENEMY_HERO_PIPE = 'T',

    // Enemy hero in the pit.
    ENEMY_HERO_PIT = 'V',

    // Enemy shadow-hero is dead. In the next tick, it will
    // disappear and appear in a new location.
    ENEMY_HERO_MASK_DIE = 'l',

    // Enemy shadow-hero is climbing the ladder.
    ENEMY_HERO_MASK_LADDER = 'n',

    // Enemy shadow-hero runs to the left.
    ENEMY_HERO_MASK_LEFT = 'p',

    // Enemy shadow-hero runs to the right.
    ENEMY_HERO_MASK_RIGHT = 'q',

    // Enemy shadow-hero is falling.
    ENEMY_HERO_MASK_FALL = 'r',

    // Enemy shadow-hero is crawling along the pipe.
    ENEMY_HERO_MASK_PIPE = 't',

    // Enemy shadow-hero in the pit.
    ENEMY_HERO_MASK_PIT = 'v',

    // Robber is climbing the ladder.
    ROBBER_LADDER = 'X',

    // Robber runs to the left. Robber picks up the nearest prey
    // and hunts for it until it overtakes it.
    ROBBER_LEFT = ')',

    // Robber runs to the right. Robber picks up the nearest prey
    // and hunts for it until it overtakes it.
    ROBBER_RIGHT = '(',

    // Robber is falling.
    ROBBER_FALL = 'x',

    // Robber is crawling along the pipe.
    ROBBER_PIPE = 'Y',

    // Robber in the pit.
    ROBBER_PIT = 'y',

    // Opened golden gates. Can only be locked with a golden key.
    OPENED_DOOR_GOLD = 'g',

    // Opened silver gates. Can only be locked with a silver key.
    OPENED_DOOR_SILVER = 's',

    // Opened bronze gates. Can only be locked with a bronze key.
    OPENED_DOOR_BRONZE = 'b',

    // Closed golden gates. Can only be opened with a golden key.
    CLOSED_DOOR_GOLD = 'G',

    // Closed silver gates. Can only be opened with a silver key.
    CLOSED_DOOR_SILVER = 'S',

    // Closed bronze gates. Can only be opened with a bronze key.
    CLOSED_DOOR_BRONZE = 'B',

    // Golden key. Helps open/close golden gates. The key can only
    // be used once.
    KEY_GOLD = '+',

    // Silver key. Helps open/close silver gates. The key can only
    // be used once.
    KEY_SILVER = '-',

    // Bronze key. Helps open/close bronze gates. The key can only
    // be used once.
    KEY_BRONZE = '!',

    // Bullet. After the shot by the hero, the bullet flies until
    // it meets an obstacle. The bullet kills the hero. It
    // ricochets from the indestructible wall (no more than 1
    // time). The bullet destroys the destructible wall.
    BULLET = '•',

    // Ladder - the hero can move along the level along it.
    LADDER = 'H',

    // Pipe - the hero can also move along the level along it, but
    // only horizontally.
    PIPE = '~',

    // Back door - allows the hero to secretly move to another
    // random place on the map.
    BACKWAY = 'W',

    // Disguise potion - endow the hero with additional abilities.
    // The hero goes into shadow mode.
    MASK_POTION = 'm'
}

export const HERO_ELEMENTS = [
    Elements.HERO_DIE,
    Elements.HERO_LADDER,
    Elements.HERO_LEFT,
    Elements.HERO_RIGHT,
    Elements.HERO_FALL,
    Elements.HERO_PIPE,
    Elements.HERO_PIT,

    Elements.HERO_MASK_DIE,
    Elements.HERO_MASK_LADDER,
    Elements.HERO_MASK_LEFT,
    Elements.HERO_MASK_RIGHT,
    Elements.HERO_MASK_FALL,
    Elements.HERO_MASK_PIPE,
    Elements.HERO_MASK_PIT,
];

export const ENEMY_ELEMENTS = [
    Elements.OTHER_HERO_LADDER,
    Elements.OTHER_HERO_LEFT,
    Elements.OTHER_HERO_RIGHT,
    Elements.OTHER_HERO_PIPE,

    Elements.OTHER_HERO_MASK_LADDER,
    Elements.OTHER_HERO_MASK_LEFT,
    Elements.OTHER_HERO_MASK_RIGHT,
    Elements.OTHER_HERO_MASK_PIPE,

    Elements.ENEMY_HERO_LADDER,
    Elements.ENEMY_HERO_LEFT,
    Elements.ENEMY_HERO_RIGHT,
    Elements.ENEMY_HERO_PIPE,

    Elements.ENEMY_HERO_MASK_LADDER,
    Elements.ENEMY_HERO_MASK_LEFT,
    Elements.ENEMY_HERO_MASK_RIGHT,
    Elements.ENEMY_HERO_MASK_PIPE,
];

export const CHARACTER_ELEMENTS = [
    Elements.HERO_DIE,
    Elements.HERO_LADDER,
    Elements.HERO_LEFT,
    Elements.HERO_RIGHT,
    Elements.HERO_FALL,
    Elements.HERO_PIPE,
    Elements.HERO_PIT,

    Elements.HERO_MASK_DIE,
    Elements.HERO_MASK_LADDER,
    Elements.HERO_MASK_LEFT,
    Elements.HERO_MASK_RIGHT,
    Elements.HERO_MASK_FALL,
    Elements.HERO_MASK_PIPE,
    Elements.HERO_MASK_PIT,

    Elements.OTHER_HERO_DIE,
    Elements.OTHER_HERO_LADDER,
    Elements.OTHER_HERO_LEFT,
    Elements.OTHER_HERO_RIGHT,
    Elements.OTHER_HERO_FALL,
    Elements.OTHER_HERO_PIPE,
    Elements.OTHER_HERO_PIT,

    Elements.OTHER_HERO_MASK_DIE,
    Elements.OTHER_HERO_MASK_LADDER,
    Elements.OTHER_HERO_MASK_LEFT,
    Elements.OTHER_HERO_MASK_RIGHT,
    Elements.OTHER_HERO_MASK_FALL,
    Elements.OTHER_HERO_MASK_PIPE,
    Elements.OTHER_HERO_MASK_PIT,

    Elements.ENEMY_HERO_DIE,
    Elements.ENEMY_HERO_LADDER,
    Elements.ENEMY_HERO_LEFT,
    Elements.ENEMY_HERO_RIGHT,
    Elements.ENEMY_HERO_FALL,
    Elements.ENEMY_HERO_PIPE,
    Elements.ENEMY_HERO_PIT,

    Elements.ENEMY_HERO_MASK_DIE,
    Elements.ENEMY_HERO_MASK_LADDER,
    Elements.ENEMY_HERO_MASK_LEFT,
    Elements.ENEMY_HERO_MASK_RIGHT,
    Elements.ENEMY_HERO_MASK_FALL,
    Elements.ENEMY_HERO_MASK_PIPE,
    Elements.ENEMY_HERO_MASK_PIT,

    Elements.ROBBER_LADDER,
    Elements.ROBBER_LEFT,
    Elements.ROBBER_RIGHT,
    Elements.ROBBER_FALL,
    Elements.ROBBER_PIPE,
    Elements.ROBBER_PIT,
];

export const CLUE_ELEMENTS = [
    Elements.CLUE_KNIFE,
    Elements.CLUE_GLOVE,
    Elements.CLUE_RING
];

export const LADDER_ELEMENTS = [
    Elements.LADDER,
    Elements.HERO_LADDER,
    Elements.ROBBER_LADDER,
    Elements.ENEMY_HERO_LADDER,
    Elements.HERO_MASK_LADDER,
    Elements.ENEMY_HERO_MASK_LADDER,
    Elements.OTHER_HERO_LADDER,
    Elements.OTHER_HERO_MASK_LADDER,
];

export const PIPE_ELEMENTS = [
    Elements.PIPE,
    Elements.HERO_PIPE,
    Elements.ROBBER_PIPE,
    Elements.ENEMY_HERO_PIPE,
    Elements.HERO_MASK_PIPE,
    Elements.ENEMY_HERO_MASK_PIPE,
    Elements.OTHER_HERO_PIPE,
    Elements.OTHER_HERO_MASK_PIPE,
];

export const RUBBER_ELEMENTS = [
    Elements.ROBBER_LADDER,
    Elements.ROBBER_LEFT,
    Elements.ROBBER_RIGHT,
    Elements.ROBBER_FALL,
    Elements.ROBBER_PIPE,
    Elements.ROBBER_PIT,
];
