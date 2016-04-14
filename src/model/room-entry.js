var tiles4x4 = [
    [{type:"wall",subtype:"sw"},{type:"wall",subtype:"w"},{type:"wall",subtype: "w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nw"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"se"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"}]
];
var tiles5x4 = [
    [{type:"wall",subtype:"sw"},{type:"wall",subtype:"w"},{type:"wall",subtype: "w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nw"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"se"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"}]
];
var tiles6x4 = [
    [{type:"wall",subtype:"sw"},{type:"wall",subtype:"w"},{type:"wall",subtype: "w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nw"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"se"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"}]
];
var tiles7x4 = [
    [{type:"wall",subtype:"sw"},{type:"wall",subtype:"w"},{type:"wall",subtype: "w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nw"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"se"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"}]
];
var tiles4x5 = [
    [{type:"wall",subtype:"sw"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype: "w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nw"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"se"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"}]
];
var tiles5x5 = [
    [{type:"wall",subtype:"sw"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype: "w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nw"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"se"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"}]
];
var tiles6x5 = [
    [{type:"wall",subtype:"sw"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype: "w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nw"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"se"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"}]
];
var tiles7x5 = [
    [{type:"wall",subtype:"sw"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype: "w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nw"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"se"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"}]
];
var tiles4x6 = [
    [{type:"wall",subtype:"sw"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nw"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"se"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"}]
];
var tiles5x6 = [
    [{type:"wall",subtype:"sw"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nw"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"se"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"}]
];
var tiles6x6 = [
    [{type:"wall",subtype:"sw"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nw"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"se"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"}]
];
var tiles7x6 = [
    [{type:"wall",subtype:"sw"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nw"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"se"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"}]
];

var tiles6x4cross = [
    [null,{type:"wall",subtype:"sw"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nw"},null],
    [{type:"wall",subtype:"sw"},{type:"wall",subtype:"swlong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nwlong"},{type:"wall",subtype:"nw"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"se"},{type:"wall",subtype:"selong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nelong"},{type:"wall",subtype:"ne"}],
    [null,{type:"wall",subtype:"se"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"},null]
];

var tiles5x6ZigVertical = [
    [{type:"wall",subtype:"sw"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nw"},null],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nwlong"},{type:"wall",subtype:"nw"}],
    [{type:"wall",subtype:"sesw"},{type:"wall",subtype:"sewlong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"newlong"},{type:"wall",subtype:"nenw"}],
    [{type:"wall",subtype:"sesw"},{type:"wall",subtype:"sewlong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nelong"},{type:"wall",subtype:"ne"}],
    [{type:"wall",subtype:"se"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"},null]
];

var tiles6x6UpArrow = [
    [{type:"wall",subtype:"sw"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nw"},null,null],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nwlong"},{type:"wall",subtype:"nw"},null],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nwlong"},{type:"wall",subtype:"nw"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nelong"},{type:"wall",subtype:"ne"}],
    [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nelong"},{type:"wall",subtype:"ne"},null],
    [{type:"wall",subtype:"se"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"},null,null]
];

var rooms = [];

rooms.push({ //初始 room1
    turnLimit:6,
    scoreCondition: null,
    winEveryConditions:[
        "outOfTurn"
    ],
    loseAnyConditions:[],
    rules:{
        heroCanGetExp: false
    },
    enemyPool:[{
        type:"pudding", subtype:"red"
    },{
        type:"pudding", subtype:"yellow"
    },{
        type:"pudding", subtype:"blue"
    }],
    initTiles: tiles5x5,
    initMovables:[
        {
            type:"pudding",subtype:"yellow",
            positions: [{x:3,y:2}]
        },
        {
            type:"pudding",subtype:"red",
            positions: [{x:2,y:2}]
        },
        {
            type:"pudding",subtype:"blue",
            positions: [{x:1,y:2}]
        },
        {
            type:"pudding",subtype:"yellow",
            positions: [{x:3,y:1}]
        },
        {
            type:"pudding",subtype:"red",
            positions: [{x:2,y:1}]
        },
        {
            type:"pudding",subtype:"blue",
            positions: [{x:1,y:1}]
        }
    ],
    initHero: {
        type:"normalHero",
        positions: [{x:3,y:3}],
        initHp: 100,
        initMaxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        }, //normal, fix
        isShowLevel: false
    }
});

rooms.push({ //教学杀敌数过关，分数无要求 room2
    turnLimit:10,
    scoreCondition: null,
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "red",
            number: 1
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "yellow",
            number: 1
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "blue",
            number: 1
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "green",
            number: 1
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    rules:{
        heroCanGetExp: false
    },
    genEnemyStrategy: [{type:"random", number: 3, last: 0}],
    enemyPool:[{
        type:"pudding", subtype:"red"
    },{
        type:"pudding", subtype:"yellow"
    },{
        type:"pudding", subtype:"green"
    },{
        type:"pudding", subtype:"blue"
    }],
    initTiles:tiles7x4,
    initMovables:[{
        type:"pudding",subtype:"red",
        positions: [{x:1,y:1}]
    },{
        type:"pudding",subtype:"yellow",
        positions: [{x:2,y:1}]
    },{
        type:"pudding",subtype:"green",
        positions: [{x:3,y:1}]
    },{
        type:"pudding",subtype:"blue",
        positions: [{x:4,y:1}]
    }],
    initHero: {
        type:"normalHero",
        positions: [{x:5,y:3}],
        initHp: 100,
        initMaxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        }, //normal, fix
        isShowLevel: false
    }
});

rooms.push({ //教学杀敌数过关，且有分数要求 room3
    turnLimit:15,
    scoreCondition: [200, 400, 600],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "red",
            number: 3
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "yellow",
            number: 3
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "blue",
            number: 3
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "green",
            number: 3
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    rules:{
        heroCanGetExp: false
    },
    enemyPool:[{
        type:"pudding",subtype:"red"
    },{
        type:"pudding",subtype:"yellow"
    },{
        type:"pudding",subtype:"green"
    },{
        type:"pudding",subtype:"blue"
    }],
    initTiles:tiles6x4,
    initMovables:[{
        type:"pudding",subtype:"red",
        positions: [{x:1,y:1}]
    },{
        type:"pudding",subtype:"yellow",
        positions: [{x:2,y:1}]
    },{
        type:"pudding",subtype:"green",
        positions: [{x:3,y:1}]
    },{
        type:"pudding",subtype:"blue",
        positions: [{x:4,y:1}]
    },{
        type:"pudding",subtype:"red",
        positions: [{x:1,y:2}]
    },{
        type:"pudding",subtype:"yellow",
        positions: [{x:2,y:2}]
    },{
        type:"pudding",subtype:"green",
        positions: [{x:3,y:2}]
    },{
        type:"pudding",subtype:"blue",
        positions: [{x:4,y:2}]
    }],
    initHero: {
        type:"normalHero",
        positions: [{x:3,y:3}],
        initHp: 100,
        initMaxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        }, //normal, fix
        isShowLevel: false
    }
});

rooms.push({ //教学获得经验和升级 room4
    turnLimit:20,
    scoreCondition: [250, 450, 700],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "red",
            number: 5
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "yellow",
            number: 5
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "blue",
            number: 5
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "green",
            number: 5
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    rules:{
        canRefreshChoice: true
    },
    enemyPool:[{
        type:"pudding",subtype:"red"
    },{
        type:"pudding",subtype:"yellow"
    },{
        type:"pudding",subtype:"green"
    },{
        type:"pudding",subtype:"blue"
    }],
    initTiles:[
        [null,null,{type:"wall",subtype:"sw"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nw"},null,null],
        [null,{type:"wall",subtype:"sw"},{type:"wall",subtype:"swlong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nwlong"},{type:"wall",subtype:"nw"},null],
        [{type:"wall",subtype:"sw"},{type:"wall",subtype:"swlong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nwlong"},{type:"wall",subtype:"nw"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"se"},{type:"wall",subtype:"selong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nelong"},{type:"wall",subtype:"ne"}],
        [null,{type:"wall",subtype:"se"},{type:"wall",subtype:"selong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nelong"},{type:"wall",subtype:"ne"},null],
        [null,null,{type:"wall",subtype:"se"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"},null,null]
    ],
    initMovables:[
    ],
    initHero: {
        type:"normalHero",
        positions: [{x:3,y:3}],
        initHp: 100,
        initMaxHp: 100,
        initRequireExp: 50,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        }, //normal, fix
        isShowLevel: false
    },
    choicePool:[
        { type:"getScore", opt:{ number:300} },
        { type:"getFullHp" },
        { type:"getRandomMove", opt:{ from:3, to:5} },
        { type:"getCard", opt:{type:"heal"}},
        { type:"getCard", opt:{type:"tail-slash"}}
    ]
});

rooms.push({ //第一次要求大量杀敌 room5
    turnLimit:24,
    scoreCondition: [300, 600, 1000],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "red",
            number: 12
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "yellow",
            number: 12
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "blue",
            number: 12
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    genEnemyStrategy: [{type:"random", number: 4, last: 0}],
    enemyPool:[{
        type:"pudding",subtype:"red"
    },{
        type:"pudding",subtype:"yellow"
    },{
        type:"pudding",subtype:"blue"
    }],
    initTiles:tiles5x6ZigVertical,
    initMovables:[
    ],
    initHero: {
        type:"normalHero",
        positions: [{x:3,y:3}],
        initHp: 100,
        initMaxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        }, //normal, fix
        isShowLevel: false
    },
    choicePool:[
        { type:"getScore", opt:{ number:300} },
        { type:"getFullHp" },
        { type:"getRandomMove", opt:{ from:3, to:5} },
        { type:"getCard", opt:{type:"heal"}},
        { type:"getCard", opt:{type:"tail-slash"}}
        //TODO
    ]
});

rooms.push({ //第一次出现年糕 room6
    turnLimit:15,
    scoreCondition: [100, 150, 200],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"ricecake",
            number: 4
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"pudding",subtype:"red"
    },{
        type:"pudding",subtype:"yellow"
    },{
        type:"pudding",subtype:"green"
    },{
        type:"pudding",subtype:"blue"
    }],
    initTiles:tiles6x6,
    initMovables:[
        {
            type:"ricecake",
            positions: [{x:2,y:2}]
        },
        {
            type:"ricecake",
            positions: [{x:5,y:2}]
        },
        {
            type:"ricecake",
            positions: [{x:2,y:5}]
        },
        {
            type:"ricecake",
            positions: [{x:5,y:5}]
        }
    ],
    initHero: {
        type:"normalHero",
        positions: [{x:3,y:3}],
        initHp: 100,
        initMaxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        }, //normal, fix
        isShowLevel: false
    },
    choicePool:[
        { type:"getScore", opt:{ number:300} },
        { type:"getFullHp" },
        { type:"getRandomMove", opt:{ from:3, to:5} }
    ]
});

rooms.push({ //room7
    turnLimit:15,
    scoreCondition: [100, 150, 200],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "red",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "yellow",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "blue",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "green",
            number: 2
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"pudding",subtype:"red"
    },{
        type:"pudding",subtype:"yellow"
    },{
        type:"pudding",subtype:"green"
    },{
        type:"pudding",subtype:"blue"
    }],
    initTiles:tiles6x6UpArrow,
    initMovables:[
    ],
    initHero: {
        type:"normalHero",
        positions: [{x:3,y:3}],
        initHp: 100,
        initMaxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        }, //normal, fix
        isShowLevel: false
    },
    choicePool:[
        { type:"getScore", opt:{ number:300} },
        { type:"getFullHp" },
        { type:"getRandomMove", opt:{ from:3, to:5} }
    ]
});

rooms.push({ //room8
    turnLimit:15,
    scoreCondition: [100, 150, 200],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "red",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "yellow",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "blue",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "green",
            number: 2
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"pudding",subtype:"red"
    },{
        type:"pudding",subtype:"yellow"
    },{
        type:"pudding",subtype:"green"
    },{
        type:"pudding",subtype:"blue"
    }],
    initTiles:[
        [{type:"wall",subtype:"sw"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nw"},null,null],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nwlong"},{type:"wall",subtype:"nw"},null],
        [{type:"wall",subtype:"se"},{type:"wall",subtype:"selong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nwlong"},{type:"wall",subtype:"nw"}],
        [null,{type:"wall",subtype:"se"},{type:"wall",subtype:"selong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [null,{type:"wall",subtype:"sw"},{type:"wall",subtype:"swlong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"sw"},{type:"wall",subtype:"swlong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nelong"},{type:"wall",subtype:"ne"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nelong"},{type:"wall",subtype:"ne"},null],
        [{type:"wall",subtype:"se"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"},null,null]
    ],
    initMovables:[
    ],
    initHero: {
        type:"normalHero",
        positions: [{x:3,y:3}],
        initHp: 100,
        initMaxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        }, //normal, fix
        isShowLevel: false
    },
    choicePool:[
        { type:"getScore", opt:{ number:300} },
        { type:"getFullHp" },
        { type:"getRandomMove", opt:{ from:3, to:5} },
        { type:"getCard", opt:{type:"heal"}},
        { type:"getCard", opt:{type:"tail-slash"}}
    ]
});

rooms.push({ //room9
    turnLimit:15,
    scoreCondition: [100, 150, 200],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "red",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "yellow",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "blue",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "green",
            number: 2
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"pudding",subtype:"red"
    },{
        type:"pudding",subtype:"yellow"
    },{
        type:"pudding",subtype:"green"
    },{
        type:"pudding",subtype:"blue"
    }],
    initTiles:[
        [null,{type:"wall",subtype:"sw"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nw"},null],
        [{type:"wall",subtype:"sw"},{type:"wall",subtype:"swlong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nwlong"},{type:"wall",subtype:"nw"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"pillar",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"pillar",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"pillar",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"pillar",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"se"},{type:"wall",subtype:"selong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nelong"},{type:"wall",subtype:"ne"}],
        [null,{type:"wall",subtype:"se"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"},null]
    ],
    initMovables:[
    ],
    initHero: {
        type:"normalHero",
        positions: [{x:3,y:3}],
        initHp: 100,
        initMaxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        }, //normal, fix
        isShowLevel: false
    },
    choicePool:[
        { type:"getScore", opt:{ number:300} },
        { type:"getFullHp" },
        { type:"getRandomMove", opt:{ from:3, to:5} }
    ]
});

rooms.push({ //room10
    turnLimit:15,
    scoreCondition: [100, 150, 200],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "red",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "yellow",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "blue",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "green",
            number: 2
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"pudding",subtype:"red"
    },{
        type:"pudding",subtype:"yellow"
    },{
        type:"pudding",subtype:"green"
    },{
        type:"pudding",subtype:"blue"
    }],
    initTiles:[
        [{type:"wall",subtype:"sw"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nwsw"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nw"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nswlong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nselong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"se"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"nese"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"}]
    ],
    initMovables:[
    ],
    initHero: {
        type:"normalHero",
        positions: [{x:3,y:3}],
        initHp: 100,
        initMaxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        }, //normal, fix
        isShowLevel: false
    },
    choicePool:[
        { type:"getScore", opt:{ number:300} },
        { type:"getFullHp" },
        { type:"getRandomMove", opt:{ from:3, to:5} }
    ]
});

rooms.push({ //room11
    turnLimit:15,
    scoreCondition: [100, 150, 200],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "red",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "yellow",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "blue",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "green",
            number: 2
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"pudding",subtype:"red"
    },{
        type:"pudding",subtype:"yellow"
    },{
        type:"pudding",subtype:"green"
    },{
        type:"pudding",subtype:"blue"
    }],
    initTiles:[
        [null,null,null,{type:"wall",subtype:"sw"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nw"},null,null,null],
        [null,null,{type:"wall",subtype:"sw"},{type:"wall",subtype:"swlong"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nwlong"},{type:"wall",subtype:"nw"},null,null],
        [null,{type:"wall",subtype:"sw"},{type:"wall",subtype:"swlong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nwlong"},{type:"wall",subtype:"nw"},null],
        [{type:"wall",subtype:"sw"},{type:"wall",subtype:"swlong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nwlong"},{type:"wall",subtype:"nw"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"se"},{type:"wall",subtype:"selong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nelong"},{type:"wall",subtype:"ne"}],
        [null,{type:"wall",subtype:"se"},{type:"wall",subtype:"selong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nelong"},{type:"wall",subtype:"ne"},null],
        [null,null,{type:"wall",subtype:"se"},{type:"wall",subtype:"selong"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nelong"},{type:"wall",subtype:"ne"},null,null],
        [null,null,null,{type:"wall",subtype:"se"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"},null,null,null]
    ],
    initMovables:[
    ],
    initHero: {
        type:"normalHero",
        positions: [{x:4,y:4}],
        initHp: 100,
        initMaxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        }, //normal, fix
        isShowLevel: false
    },
    choicePool:[
        { type:"getScore", opt:{ number:300} },
        { type:"getFullHp" },
        { type:"getRandomMove", opt:{ from:3, to:5} }
    ]
});

rooms.push({ //room12
    turnLimit:15,
    scoreCondition: [100, 150, 200],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "red",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "yellow",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "blue",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "green",
            number: 2
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"pudding",subtype:"red"
    },{
        type:"pudding",subtype:"yellow"
    },{
        type:"pudding",subtype:"green"
    },{
        type:"pudding",subtype:"blue"
    }],
    initTiles:[
        [null,null,null,null,null,null,{type:"wall",subtype:"sw"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nw"}],
        [null,null,null,null,null,{type:"wall",subtype:"sw"},{type:"wall",subtype:"swlong"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [null,null,null,null,{type:"wall",subtype:"sw"},{type:"wall",subtype:"swlong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [null,null,null,{type:"wall",subtype:"sw"},{type:"wall",subtype:"swlong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [null,null,{type:"wall",subtype:"sw"},{type:"wall",subtype:"swlong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [null,{type:"wall",subtype:"sw"},{type:"wall",subtype:"swlong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"sw"},{type:"wall",subtype:"swlong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"se"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"}]
    ],
    initMovables:[
    ],
    initHero: {
        type:"normalHero",
        positions: [{x:4,y:4}],
        initHp: 100,
        initMaxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        }, //normal, fix
        isShowLevel: false
    },
    choicePool:[
        { type:"getScore", opt:{ number:300} },
        { type:"getFullHp" },
        { type:"getRandomMove", opt:{ from:3, to:5} }
    ]
});

rooms.push({ //room13
    turnLimit:15,
    scoreCondition: [100, 150, 200],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "red",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "yellow",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "blue",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "green",
            number: 2
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"pudding",subtype:"red"
    },{
        type:"pudding",subtype:"yellow"
    },{
        type:"pudding",subtype:"green"
    },{
        type:"pudding",subtype:"blue"
    }],
    initTiles:[
        [{type:"wall",subtype:"sw"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nw"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nelong"},{type:"wall",subtype:"selong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nwlong"},{type:"wall",subtype:"swlong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"se"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"}]
    ],
    initMovables:[
    ],
    initHero: {
        type:"normalHero",
        positions: [{x:3,y:2}],
        initHp: 100,
        initMaxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        }, //normal, fix
        isShowLevel: false
    },
    choicePool:[
        { type:"getScore", opt:{ number:300} },
        { type:"getFullHp" },
        { type:"getRandomMove", opt:{ from:3, to:5} }
    ]
});

rooms.push({ //room14
    turnLimit:15,
    scoreCondition: [100, 150, 200],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "red",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "yellow",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "blue",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "green",
            number: 2
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    rules:{
        canRefreshChoice: false
    },
    enemyPool:[{
        type:"pudding",subtype:"red"
    },{
        type:"pudding",subtype:"yellow"
    },{
        type:"pudding",subtype:"green"
    },{
        type:"pudding",subtype:"blue"
    }],
    initTiles:[
        [null,null,{type:"wall",subtype:"sw"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nw"},null,null],
        [null,null,{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"},null,null],
        [{type:"wall",subtype:"sw"},{type:"wall",subtype:"w"},{type:"wall",subtype:"swlong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nwlong"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nw"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"se"},{type:"wall",subtype:"e"},{type:"wall",subtype:"selong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nelong"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"}],
        [null,null,{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"},null,null],
        [null,null,{type:"wall",subtype:"se"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"},null,null]
    ],
    initMovables:[
    ],
    initHero: {
        type:"normalHero",
        positions: [{x:3,y:3}],
        initHp: 100,
        initMaxHp: 100,
        initRequireExp: 10,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        }, //normal, fix
        isShowLevel: false
    },
    choicePool:[
        { type:"getScore", opt:{ number:300} },
        { type:"getFullHp" }
    ],
    choicePool:[
        { type:"getScore", opt:{ number:300} },
        { type:"getFullHp" },
        { type:"getRandomMove", opt:{ from:3, to:5} }
    ]
});

rooms.push({ //room15
    turnLimit:15,
    scoreCondition: [100, 150, 200],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "red",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "yellow",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "blue",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "green",
            number: 2
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    rules:{
        canRefreshChoice: false
    },
    enemyPool:[{
        type:"pudding",subtype:"red"
    },{
        type:"pudding",subtype:"yellow"
    },{
        type:"pudding",subtype:"green"
    },{
        type:"pudding",subtype:"blue"
    }],
    initTiles:[
        [null,null,null,{type:"wall",subtype:"sw"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nw"},null],
        [{type:"wall",subtype:"sw"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"swlong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"},null],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"},null],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nwlong"},{type:"wall",subtype:"nw"}],
        [{type:"wall",subtype:"se"},{type:"wall",subtype:"selong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [null,{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [null,{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nelong"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"}],
        [null,{type:"wall",subtype:"se"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"},null,null,null]
    ],
    initMovables:[
    ],
    initHero: {
        type:"normalHero",
        positions: [{x:3,y:3}],
        initHp: 100,
        initMaxHp: 100,
        initRequireExp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        }, //normal, fix
        isShowLevel: false
    },
    choicePool:[
        { type:"getScore", opt:{ number:300} },
        { type:"getFullHp" },
        { type:"getRandomMove", opt:{ from:3, to:5} }
    ]
});

rooms.push({ //room16
    turnLimit:15,
    scoreCondition: [100, 150, 200],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "red",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "yellow",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "blue",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "green",
            number: 2
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    rules:{
        canRefreshChoice: false
    },
    enemyPool:[{
        type:"pudding",subtype:"red"
    },{
        type:"pudding",subtype:"yellow"
    },{
        type:"pudding",subtype:"green"
    },{
        type:"pudding",subtype:"blue"
    }],
    initTiles:[
        [{type:"wall",subtype:"sw"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nw"},null,{type:"wall",subtype:"sw"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nw"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nwlong"},{type:"wall",subtype:"w"},{type:"wall",subtype:"swlong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nelong"},{type:"wall",subtype:"ne"}],
        [{type:"wall",subtype:"se"},{type:"wall",subtype:"selong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"},null],
        [null,{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nwlong"},{type:"wall",subtype:"nw"}],
        [{type:"wall",subtype:"sw"},{type:"wall",subtype:"swlong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nelong"},{type:"wall",subtype:"e"},{type:"wall",subtype:"selong"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"se"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"},null,{type:"wall",subtype:"se"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"}]
    ],
    initMovables:[
    ],
    initHero: {
        type:"normalHero",
        positions: [{x:3,y:3}],
        initHp: 100,
        initMaxHp: 100,
        initRequireExp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        }, //normal, fix
        isShowLevel: false
    },
    choicePool:[
        { type:"getScore", opt:{ number:300} },
        { type:"getFullHp" },
        { type:"getRandomMove", opt:{ from:3, to:5} }
    ]
});

rooms.push({ //room17
    turnLimit:12,
    scoreCondition: [100, 150, 200],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "red",
            number: 1
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "yellow",
            number: 1
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "blue",
            number: 1
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "green",
            number: 1
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    rules:{
        heroCanGetExp: false
    },
    genEnemyStrategy: [{type:"random", number: 3, last: 0}],
    enemyPool:[{
        type:"pudding", subtype:"red"
    },{
        type:"pudding", subtype:"yellow"
    },{
        type:"pudding", subtype:"green"
    },{
        type:"pudding", subtype:"blue"
    }],
    initTiles:[
        [{type:"wall",subtype:"sw"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nw"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"newlong"},{type:"wall",subtype:"ewlong"},{type:"wall",subtype:"sewlong"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"se"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"}]
    ],
    initMovables:[],
    initHero: {
        type:"normalHero",
        positions: [{x:5,y:3}],
        initHp: 100,
        initMaxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        }, //normal, fix
        isShowLevel: false
    },
    choicePool:[
        { type:"getScore", opt:{ number:300} },
        { type:"getFullHp" },
        { type:"getRandomMove", opt:{ from:3, to:5} }
    ]
});

rooms.push({ //room18
    turnLimit:12,
    scoreCondition: [100, 150, 200],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "red",
            number: 1
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "yellow",
            number: 1
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "blue",
            number: 1
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "green",
            number: 1
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    rules:{
        heroCanGetExp: false
    },
    genEnemyStrategy: [{type:"random", number: 3, last: 0}],
    enemyPool:[{
        type:"pudding", subtype:"red"
    },{
        type:"pudding", subtype:"yellow"
    },{
        type:"pudding", subtype:"green"
    },{
        type:"pudding", subtype:"blue"
    }],
    initTiles:[
        [null,null,null,null,{type:"wall",subtype:"sw"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nw"}],
        [null,null,null,null,{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"sw"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"swlong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nelong"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"},null,null,null,null],
        [{type:"wall",subtype:"se"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"},null,null,null,null]
    ],
    initMovables:[],
    initHero: {
        type:"normalHero",
        positions: [{x:4,y:3}],
        initHp: 100,
        initMaxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        }, //normal, fix
        isShowLevel: false
    },
    choicePool:[
        { type:"getScore", opt:{ number:300} },
        { type:"getFullHp" },
        { type:"getRandomMove", opt:{ from:3, to:5} }
    ]
});

rooms.push({ //room19
    turnLimit:12,
    scoreCondition: [100, 150, 200],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "red",
            number: 1
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "yellow",
            number: 1
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "blue",
            number: 1
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "green",
            number: 1
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    rules:{
        heroCanGetExp: false
    },
    genEnemyStrategy: [{type:"random", number: 4, last: 0}],
    enemyPool:[{
        type:"pudding", subtype:"red"
    },{
        type:"pudding", subtype:"yellow"
    },{
        type:"pudding", subtype:"green"
    },{
        type:"pudding", subtype:"blue"
    }],
    initTiles:[
        [{type:"wall",subtype:"sw"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nw"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"se"},{type:"wall",subtype:"selong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nelong"},{type:"wall",subtype:"ne"}],
        [{type:"wall",subtype:"sw"},{type:"wall",subtype:"swlong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nwlong"},{type:"wall",subtype:"nw"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"se"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"}]
    ],
    initMovables:[],
    initHero: {
        type:"normalHero",
        positions: [{x:5,y:3}],
        initHp: 100,
        initMaxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        }, //normal, fix
        isShowLevel: false
    },
    choicePool:[
        { type:"getScore", opt:{ number:300} },
        { type:"getFullHp" },
        { type:"getRandomMove", opt:{ from:3, to:5} }
    ]
});

rooms.push({ //room20
    turnLimit:15,
    scoreCondition: [100, 150, 200],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "red",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "yellow",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "blue",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "green",
            number: 2
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"pudding",subtype:"red"
    },{
        type:"pudding",subtype:"yellow"
    },{
        type:"pudding",subtype:"green"
    },{
        type:"pudding",subtype:"blue"
    }],
    initTiles:[
        [{type:"wall",subtype:"sw"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nw"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"pillar",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"pillar",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"pillar",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"pillar",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"se"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"}]
    ],
    initMovables:[
    ],
    initHero: {
        type:"normalHero",
        positions: [{x:3,y:3}],
        initHp: 100,
        initMaxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        }, //normal, fix
        isShowLevel: false
    },
    choicePool:[
        { type:"getScore", opt:{ number:300} },
        { type:"getFullHp" },
        { type:"getRandomMove", opt:{ from:3, to:5} }
    ]
});

rooms.push({ //room21
    turnLimit:15,
    scoreCondition: [300, 600, 1000],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"ricecake",
            number: 8
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"pudding",subtype:"red"
    },{
        type:"pudding",subtype:"yellow"
    },{
        type:"pudding",subtype:"green"
    }],
    initTiles:[
        [{type:"wall",subtype:"sw"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nw"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"se"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"}]
    ],
    initMovables:[
        { type:"ricecake", positions: [{x:1,y:5}] },
        { type:"ricecake", positions: [{x:2,y:1}] },
        { type:"ricecake", positions: [{x:2,y:3}] },
        { type:"ricecake", positions: [{x:3,y:5}] },
        { type:"ricecake", positions: [{x:4,y:2}] },
        { type:"ricecake", positions: [{x:5,y:4}] },
        { type:"ricecake", positions: [{x:5,y:6}] },
        { type:"ricecake", positions: [{x:6,y:2}] }
    ],
    initHero: {
        type:"normalHero",
        positions: [{x:3,y:4}],
        initHp: 100,
        initMaxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        }, //normal, fix
        isShowLevel: false
    },
    choicePool:[
        { type:"getScore", opt:{ number:300} },
        { type:"getFullHp" },
        { type:"getRandomMove", opt:{ from:3, to:5} }
    ]
});

rooms.push({ //对远程兵种的生存1 room22
    turnLimit:25,
    scoreCondition: [300, 600, 1000],
    winEveryConditions:[
        "outOfTurn"
    ],
    loseAnyConditions:[
    ],
    enemyPool:[{
        type:"cherrycake"
    },{
        type:"pudding",subtype:"yellow"
    },{
        type:"pudding",subtype:"green" //TODO archer please
    }],
    initTiles:[
        [{type:"wall",subtype:"sw"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nw"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"sesw"},{type:"wall",subtype:"ewlong"},{type:"wall",subtype:"ewlong"},{type:"wall",subtype:"ewlong"},{type:"wall",subtype:"ewlong"},{type:"wall",subtype:"ewlong"},{type:"wall",subtype:"nenw"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"se"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"}]
    ],
    initMovables:[],
    initHero: {
        type:"normalHero",
        positions: [{x:3,y:4}],
        initHp: 100,
        initMaxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        }, //normal, fix
        isShowLevel: false
    },
    choicePool:[
        { type:"getScore", opt:{ number:300} },
        { type:"getFullHp" },
        { type:"getRandomMove", opt:{ from:3, to:5} }
    ]
});

rooms.push({ //对远程兵种的生存2 room23
    turnLimit:25,
    scoreCondition: [300, 600, 1000],
    winEveryConditions:[
        "outOfTurn"
    ],
    loseAnyConditions:[
    ],
    enemyPool:[{
        type:"cherrycake"
    },{
        type:"pudding",subtype:"yellow"
    },{
        type:"pudding",subtype:"green" //TODO archer please
    }],
    initTiles:[
        [{type:"wall",subtype:"sw"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nw"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"sesw"},{type:"wall",subtype:"ewlong"},{type:"wall",subtype:"ewlong"},{type:"wall",subtype:"ewlong"},{type:"wall",subtype:"ewlong"},{type:"wall",subtype:"ewlong"},{type:"wall",subtype:"nenw"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"sesw"},{type:"wall",subtype:"ewlong"},{type:"wall",subtype:"ewlong"},{type:"wall",subtype:"ewlong"},{type:"wall",subtype:"ewlong"},{type:"wall",subtype:"ewlong"},{type:"wall",subtype:"nenw"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"se"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"}]
    ],
    initMovables:[],
    initHero: {
        type:"normalHero",
        positions: [{x:3,y:4}],
        initHp: 100,
        initMaxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        }, //normal, fix
        isShowLevel: false
    },
    choicePool:[
        { type:"getScore", opt:{ number:300} },
        { type:"getFullHp" },
        { type:"getRandomMove", opt:{ from:3, to:5} }
    ]
});

rooms.push({ //对远程兵种的生存3 room24
    turnLimit:25,
    scoreCondition: [300, 600, 1000],
    winEveryConditions:[
        "outOfTurn"
    ],
    loseAnyConditions:[
    ],
    enemyPool:[{
        type:"cherrycake"
    },{
        type:"pudding",subtype:"yellow"
    },{
        type:"pudding",subtype:"green" //TODO archer please
    }],
    initTiles:[
        [{type:"wall",subtype:"sw"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nwsw"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nwsw"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nw"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nslong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nslong"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"sesw"},{type:"wall",subtype:"ewlong"},{type:"wall",subtype:"swlongne"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nwlongse"},{type:"wall",subtype:"ewlong"},{type:"wall",subtype:"nenw"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"sesw"},{type:"wall",subtype:"ewlong"},{type:"wall",subtype:"selongnw"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nelongsw"},{type:"wall",subtype:"welong"},{type:"wall",subtype:"nenw"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nslong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nslong"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"se"},{type:"wall",subtype:"e"},{type:"wall",subtype:"nese"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"nese"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"}]
    ],
    initMovables:[],
    initHero: {
        type:"normalHero",
        positions: [{x:3,y:4}],
        initHp: 100,
        initMaxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        }, //normal, fix
        isShowLevel: false
    },
    choicePool:[
        { type:"getScore", opt:{ number:300} },
        { type:"getFullHp" },
        { type:"getRandomMove", opt:{ from:3, to:5} }
    ]
});
