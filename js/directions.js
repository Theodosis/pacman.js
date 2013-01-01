Directions = {
    mapToVector: {
        37: new Vector( -1, 0 ),
        38: new Vector( 0, -1 ),
        39: new Vector( 1, 0 ),
        40: new Vector( 0, 1 )
    },
    mapToDirection: {
        37: "W",
        38: "N",
        39: "E",
        40: "S"
    },
    directionToVector: {
        "":  new Vector( 0, 0 ),
        "W": new Vector( -1, 0 ),
        "N": new Vector( 0, -1 ),
        "E": new Vector( 1, 0 ),
        "S": new Vector( 0, 1 )
    },
    oppositeDirection: {
        '': '',
        'W': 'E',
        'N': 'S',
        'E': 'W',
        'S': 'N'
    }
}
