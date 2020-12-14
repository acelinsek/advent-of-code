const directionsEnum = {
    EAST: 0,
    SOUTH: 90,
    WEST: 180,
    NORTH: 270,
}

function parseInput(input) {
    array = input.split('\n');

    return array;
}

const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
    let actions = parseInput(data);

    let ship = {
        north: 0,
        east: 0,
        facing: directionsEnum.EAST
    }

    let waypoint = {
        north: 1,
        east: 10
    }

    actions.forEach(act => {
        let [instruction, value] = [act.slice(0, 1), +act.slice(1)];

        // --------------------- Part 2 ---------------------
        switch (instruction) {
            case 'N':
                waypoint.north += value;
                break;
            case 'S':
                waypoint.north -= value;
                break;
            case 'E':
                waypoint.east += value;
                break;
            case 'W':
                waypoint.east -= value;
                break;
            case 'L':
                turnCWWaypoint(false, ship, waypoint, value);
                break;
            case 'R':
                turnCWWaypoint(true, ship, waypoint, value);
                break;
            case 'F':
                goForwardWaypoint(ship, waypoint, value);
                break;
        }

        // --------------------- Part 1 ---------------------
        // switch (instruction) {
        //     case 'N':
        //         ship.north += value;
        //         break;
        //     case 'S':
        //         ship.north -= value;
        //         break;
        //     case 'E':
        //         ship.east += value;
        //         break;
        //     case 'W':
        //         ship.east -= value;
        //         break;
        //     case 'L':
        //         turnCW(false, ship, value);
        //         break;
        //     case 'R':
        //         turnCW(true, ship, value);
        //         break;
        //     case 'F':
        //         goForward(ship, value);
        //         break;
        // }
    });

    console.log(ship.east + ' ' + ship.north);
    console.log(Math.abs(ship.east) + Math.abs(ship.north));
});

// --------------------- Part 2 ---------------------
function turnCWWaypoint(clockwise, ship, waypoint, value) {
    const times = value / 90;

    for (let i = 0; i < times; i++) {
        if (clockwise) {
            let tempNorth = waypoint.north;
            waypoint.north = -waypoint.east;
            waypoint.east = tempNorth;
        } else {
            let tempNorth = waypoint.north;
            waypoint.north = waypoint.east;
            waypoint.east = -tempNorth;
        }
    }
}

function goForwardWaypoint(ship, waypoint, value) {
    ship.north += waypoint.north * value;
    ship.east += waypoint.east * value;
}


// --------------------- Part 1 ---------------------
function turnCW(clockwise, ship, value) {
    if (clockwise) {
        ship.facing = (ship.facing + value) % 360;
    } else {
        ship.facing = (ship.facing - value) % 360;
    }

    if (ship.facing < 0) {
        ship.facing = 360 + ship.facing;
    }
}

function goForward(ship, value) {
    switch (ship.facing) {
        case directionsEnum.NORTH:
            ship.north += value;
            break;
        case directionsEnum.SOUTH:
            ship.north -= value;
            break;
        case directionsEnum.EAST:
            ship.east += value;
            break;
        case directionsEnum.WEST:
            ship.east -= value;
            break;
    }
}