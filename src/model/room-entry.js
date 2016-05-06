var wall_n = {type:"wall", subtype:"n"};
var wall_s = {type:"wall", subtype:"s"};
var wall_e = {type:"wall", subtype:"e"};
var wall_w = {type:"wall", subtype:"w"};
var wall_ne = {type:"wall", subtype:"ne"};
var wall_se = {type:"wall", subtype:"se"};
var wall_nw = {type:"wall", subtype:"nw"};
var wall_sw = {type:"wall", subtype:"sw"};
var wall_nenw = {type:"wall", subtype:"nenw"};
var wall_sesw = {type:"wall", subtype:"sesw"};
var wall_nese = {type:"wall", subtype:"nese"};
var wall_nwsw = {type:"wall", subtype:"nwsw"};
var wall_nel = {type:"wall", subtype:"nelong"};
var wall_sel = {type:"wall", subtype:"selong"};
var wall_nwl = {type:"wall", subtype:"nwlong"};
var wall_swl = {type:"wall", subtype:"swlong"};
var wall_nsl = {type:"wall", subtype:"nslong"};
var wall_ewl = {type:"wall", subtype:"ewlong"};
var wall_newl = {type:"wall", subtype:"newlong"};
var wall_sewl = {type:"wall", subtype:"sewlong"};
var wall_nsel = {type:"wall", subtype:"nselong"};
var wall_nswl = {type:"wall", subtype:"nswlong"};
var wall_nlse = {type:"wall", subtype:"nlongse"};
var wall_nlsw = {type:"wall", subtype:"nlongsw"};
var wall_slne = {type:"wall", subtype:"slongne"};
var wall_slnw = {type:"wall", subtype:"slongnw"};
var wall_elsw = {type:"wall", subtype:"elongsw"};
var wall_elnw = {type:"wall", subtype:"elongnw"};
var wall_wlse = {type:"wall", subtype:"wlongse"};
var wall_wlne = {type:"wall", subtype:"wlongne"};
var wall_nlsesw = {type:"wall", subtype:"nlongsesw"};
var wall_slnenw = {type:"wall", subtype:"slongnenw"};
var wall_elnwsw = {type:"wall", subtype:"elongnwsw"};
var wall_wlnese = {type:"wall", subtype:"wlongnese"};
var wall_nelsw = {type:"wall", subtype:"nelongsw"};
var wall_nwlse = {type:"wall", subtype:"nwlongse"};
var wall_selnw = {type:"wall", subtype:"selongnw"};
var wall_swlne = {type:"wall", subtype:"swlongne"};
var wall_h = {type:"wall", subtype:"hole"};
var floor_n = {type:"floor", subtype:"normal"};

var tiles4x4 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_ne]
];
var tiles5x4 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_ne]
];
var tiles6x4 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_ne]
];
var tiles7x4 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_ne]
];
var tiles4x5 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];
var tiles5x5 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];
var tiles6x5 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];
var tiles7x5 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];
var tiles4x6 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];
var tiles5x6 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];
var tiles6x6 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];
var tiles7x6 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];
var tiles4x7 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];
var tiles5x7 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];
var tiles6x7 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];
var tiles7x7 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles6x6Rhombus = [
    [null,null,wall_sw,wall_w,wall_w,wall_nw,null,null],
    [null,wall_sw,wall_swl,floor_n,floor_n,wall_nwl,wall_nw,null],
    [wall_sw,wall_swl,floor_n,floor_n,floor_n,floor_n,wall_nwl,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_sel,floor_n,floor_n,floor_n,floor_n,wall_nel,wall_ne],
    [null,wall_se,wall_sel,floor_n,floor_n,wall_nel,wall_ne,null],
    [null,null,wall_se,wall_e,wall_e,wall_ne,null,null]
];

var tiles7x7Rhombus = [
    [null,null,null,wall_sw,wall_w,wall_nw,null,null,null],
    [null,null,wall_sw,wall_swl,floor_n,wall_nwl,wall_nw,null,null],
    [null,wall_sw,wall_swl,floor_n,floor_n,floor_n,wall_nwl,wall_nw,null],
    [wall_sw,wall_swl,floor_n,floor_n,floor_n,floor_n,floor_n,wall_nwl,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_sel,floor_n,floor_n,floor_n,floor_n,floor_n,wall_nel,wall_ne],
    [null,wall_se,wall_sel,floor_n,floor_n,floor_n,wall_nel,wall_ne,null],
    [null,null,wall_se,wall_sel,floor_n,wall_nel,wall_ne,null,null],
    [null,null,null,wall_se,wall_e,wall_ne,null,null,null]
];

var tiles6x6Triangle = [
    [null,null,null,null,null,wall_sw,wall_w,wall_nw],
    [null,null,null,null,wall_sw,wall_swl,floor_n,wall_n],
    [null,null,null,wall_sw,wall_swl,floor_n,floor_n,wall_n],
    [null,null,wall_sw,wall_swl,floor_n,floor_n,floor_n,wall_n],
    [null,wall_sw,wall_swl,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_sw,wall_swl,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles7x7Triangle = [
    [null,null,null,null,null,null,wall_sw,wall_w,wall_nw],
    [null,null,null,null,null,wall_sw,wall_swl,floor_n,wall_n],
    [null,null,null,null,wall_sw,wall_swl,floor_n,floor_n,wall_n],
    [null,null,null,wall_sw,wall_swl,floor_n,floor_n,floor_n,wall_n],
    [null,null,wall_sw,wall_swl,floor_n,floor_n,floor_n,floor_n,wall_n],
    [null,wall_sw,wall_swl,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_sw,wall_swl,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles5x5Cross5x3 = [
    [null,wall_sw,wall_w,wall_w,wall_w,wall_nw,null],
    [wall_sw,wall_swl,floor_n,floor_n,floor_n,wall_nwl,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_sel,floor_n,floor_n,floor_n,wall_nel,wall_ne],
    [null,wall_se,wall_e,wall_e,wall_e,wall_ne,null]
];

var tiles6x6Cross6x4 = [
    [null,wall_sw,wall_w,wall_w,wall_w,wall_w,wall_nw,null],
    [wall_sw,wall_swl,floor_n,floor_n,floor_n,floor_n,wall_nwl,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_sel,floor_n,floor_n,floor_n,floor_n,wall_nel,wall_ne],
    [null,wall_se,wall_e,wall_e,wall_e,wall_e,wall_ne,null]
];

var tiles6x6Cross6x2 = [
    [null,null,wall_sw,wall_w,wall_w,wall_nw,null,null],
    [null,null,wall_s,floor_n,floor_n,wall_n,null,null],
    [wall_sw,wall_w,wall_swl,floor_n,floor_n,wall_nwl,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_sel,floor_n,floor_n,wall_nel,wall_e,wall_ne],
    [null,null,wall_s,floor_n,floor_n,wall_n,null,null],
    [null,null,wall_se,wall_e,wall_e,wall_ne,null,null]
];

var tiles7x7Cross7x5 = [
    [null,wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw,null],
    [wall_sw,wall_swl,floor_n,floor_n,floor_n,floor_n,floor_n,wall_nwl,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_sel,floor_n,floor_n,floor_n,floor_n,floor_n,wall_nel,wall_ne],
    [null,wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne,null]
];

var tiles7x7Cross7x3 = [
    [null,null,wall_sw,wall_w,wall_w,wall_w,wall_nw,null,null],
    [null,null,wall_s,floor_n,floor_n,floor_n,wall_n,null,null],
    [wall_sw,wall_w,wall_swl,floor_n,floor_n,floor_n,wall_nwl,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_sel,floor_n,floor_n,floor_n,wall_nel,wall_e,wall_ne],
    [null,null,wall_s,floor_n,floor_n,floor_n,wall_n,null,null],
    [null,null,wall_se,wall_e,wall_e,wall_e,wall_ne,null,null]
];

var tiles5x6ZigVertical = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw,null],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_nwl,wall_nw],
    [wall_sesw,wall_sewl,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_newl,wall_nenw],
    [wall_sesw,wall_sewl,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_nel,wall_ne],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne,null]
];

var tiles6x6UpArrow = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_nw,null,null],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_nwl,wall_nw,null],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_nwl,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_nel,wall_ne],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_nel,wall_ne,null],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_ne,null,null]
];

var tiles6x6UpArrow2 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_nw,null,null],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_nwl,wall_nw,null],
    [wall_se,wall_sel,floor_n,floor_n,floor_n,floor_n,wall_nwl,wall_nw],
    [null,wall_se,wall_sel,floor_n,floor_n,floor_n,floor_n,wall_n],
    [null,wall_sw,wall_swl,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_sw,wall_swl,floor_n,floor_n,floor_n,floor_n,wall_nel,wall_ne],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_nel,wall_ne,null],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_ne,null,null]
]

var tiles6x6C = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nel,wall_sel,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_n,wall_s,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_n,wall_s,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_n,wall_s,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_ne,wall_se,wall_e,wall_e,wall_ne]
];

var tiles7x7D = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nel,wall_e,wall_sel,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nwl,wall_nwsw,wall_swl,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,wall_nswl,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_sel,floor_n,florr_n,florr_n,florr_n,floor_n,wall_nel,wall_ne],
    [null,wall_se,wall_sel,floor_n,floor_n,floor_n,wall_nel,wall_ne,null],
    [null,null,wall_se,wall_e,wall_e,wall_e,wall_ne,null,null]
];

var tiles6x5HRotate90 = [
    [wall_sw,wall_w,wall_w,wall_nwsw,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,wall_nswl,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nsel,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_nese,wall_e,wall_e,wall_ne]
];

var tiles5x6H = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_sesw,wall_sewl,floor_n,floor_n,floor_n,floor_n,wall_newl,wall_nenw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles5x6H2 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_sesw,wall_ewl,wall_sewl,floor_n,floor_n,wall_newl,wall_ewl,wall_nenw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles6x5H2Rotate90 = [
    [wall_sw,wall_w,wall_w,wall_nwsw,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,wall_nsl,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nswl,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nsel,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nsl,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_nese,wall_e,wall_e,wall_ne]
];

var tiles6x6H = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_sel,floor_n,floor_n,floor_n,floor_n,wall_nel,wall_ne],
    [wall_sw,wall_swl,floor_n,floor_n,floor_n,floor_n,wall_nwl,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles6x6H2 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_sel,floor_n,floor_n,wall_nel,wall_e,wall_ne],
    [wall_sw,wall_w,wall_swl,floor_n,floor_n,wall_nwl,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles6x5N = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_elsw,wall_sewl,floor_n,floor_n,wall_nel,wall_ne],
    [wall_sw,wall_swl,floor_n,floor_n,wall_newl,wall_wlne,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles7x6N = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_elsw,wall_sewl,floor_n,floor_n,wall_nel,wall_ne],
    [null,wall_sw,wall_swl,floor_n,floor_n,wall_nel,wall_ne,null],
    [wall_sw,wall_swl,floor_n,floor_n,wall_newl,wall_wlne,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles5x5Loop = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,wall_newl,wall_ewl,wall_sewl,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles5x5Loop2 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_h,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles5x5Loop3 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,wall_nel,wall_e,wall_sel,floor_n,wall_n],
    [wall_s,floor_n,wall_n,null,wall_s,floor_n,wall_n],
    [wall_s,floor_n,wall_nwl,wall_w,wall_swl,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles6x6Loop = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nel,wall_sel,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nwl,wall_swl,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles6x6Loop2 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nel,wall_sel,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_n,wall_s,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_n,wall_s,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nwl,wall_swl,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles6x6Loop3 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,wall_nel,wall_e,wall_e,wall_sel,floor_n,wall_n],
    [wall_s,floor_n,wall_n,null,null,wall_s,floor_n,wall_n],
    [wall_s,floor_n,wall_n,null,null,wall_s,floor_n,wall_n],
    [wall_s,floor_n,wall_nwl,wall_w,wall_w,wall_swl,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles7x7Loop = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nel,wall_e,wall_sel,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_n,null,wall_s,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nwl,wall_w,wall_swl,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles7x7Loop2 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nel,wall_e,wall_sel,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_n,null,wall_s,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_n,null,wall_s,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_n,null,wall_s,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nwl,wall_w,wall_swl,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles7x7Loop3 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,wall_nel,wall_e,wall_e,wall_e,wall_sel,floor_n,wall_n],
    [wall_s,floor_n,wall_n,null,null,null,wall_s,floor_n,floor_n,wall_n],
    [wall_s,floor_n,wall_n,null,null,null,wall_s,floor_n,floor_n,wall_n],
    [wall_s,floor_n,wall_n,null,null,null,wall_s,floor_n,floor_n,wall_n],
    [wall_s,floor_n,wall_nwl,wall_w,wall_w,wall_w,wall_swl,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles7x7Loop4 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,wall_newl,wall_ewl,wall_elnwsw,wall_ewl,wall_sewl,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,wall_nsl,floor_n,floor_n,floor_n,wall_n],
    [wall_sesw,wall_ewl,wall_sewl,floor_n,wall_nsl,floor_n,wall_newl,wall_ewl,wall_nenw],
    [wall_s,floor_n,floor_n,floor_n,wall_nsl,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,wall_newl,wall_ewl,wall_wlnese,wall_ewl,wall_sewl,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles6x6Z = [
    [null,null,null,null,wall_sw,wall_w,wall_w,wall_nw],
    [null,null,null,null,wall_s,floor_n,floor_n,wall_n],
    [wall_sw,wall_w,wall_w,wall_w,wall_swl,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nel,wall_e,wall_e,wall_e,wall_ne],
    [wall_s,floor_n,floor_n,wall_n,null,null,null,null],
    [wall_se,wall_e,wall_e,wall_ne,null,null,null,null]
];

var tiles6x6Whirl = [
    [null,null,null,wall_sw,wall_w,wall_w,wall_nw,null],
    [wall_sw,wall_w,wall_w,wall_swl,floor_n,floor_n,wall_n,null],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n,null],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_nwl,wall_nw],
    [wall_se,wall_sel,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [null,wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [null,wall_s,floor_n,floor_n,wall_nel,wall_e,wall_e,wall_ne],
    [null,wall_se,wall_e,wall_e,wall_ne,null,null,null]
];

var tiles6x6Whirl2 = [
    [wall_sw,wall_w,wall_nw,null,wall_sw,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,wall_nwl,wall_w,wall_swl,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_nel,wall_ne],
    [wall_se,wall_sel,floor_n,floor_n,floor_n,floor_n,wall_n,null],
    [null,wall_s,floor_n,floor_n,floor_n,floor_n,wall_nwl,wall_nw],
    [wall_sw,wall_swl,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nel,wall_e,wall_sel,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_ne,null,wall_se,wall_e,wall_ne]
];

var tiles6x6Mi = [
    [wall_sw,wall_w,wall_nwsw,wall_w,wall_w,wall_nwsw,wall_w,wall_nw],
    [wall_s,floor_n,wall_nsl,floor_n,floor_n,wall_nsl,floor_n,wall_n],
    [wall_sesw,wall_ewl,wall_swlne,floor_n,floor_n,wall_nwlse,wall_ewl,wall_nenw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_sesw,wall_ewl,wall_selnw,floor_n,floor_n,wall_nelsw,wall_ewl,wall_nenw],
    [wall_s,floor_n,wall_nsl,floor_n,floor_n,wall_nsl,floor_n,wall_n],
    [wall_se,wall_e,wall_nese,wall_e,wall_e,wall_nese,wall_e,wall_ne]
];

var tiles7x7Mi = [
    [wall_sw,wall_w,wall_nwsw,wall_w,wall_w,wall_w,wall_nwsw,wall_w,wall_nw],
    [wall_s,floor_n,wall_nsl,floor_n,floor_n,floor_n,wall_nsl,floor_n,wall_n],
    [wall_sesw,wall_ewl,wall_swlne,floor_n,floor_n,floor_n,wall_nwlse,wall_ewl,wall_nenw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_sesw,wall_ewl,wall_selnw,floor_n,floor_n,floor_n,wall_nelsw,wall_ewl,wall_nenw],
    [wall_s,floor_n,wall_nsl,floor_n,floor_n,floor_n,wall_nsl,floor_n,wall_n],
    [wall_se,wall_e,wall_nese,wall_e,wall_e,wall_e,wall_nese,wall_e,wall_ne]
];

var tiles6x5IO = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_sesw,wall_ewl,wall_ewl,wall_ewl,wall_ewl,wall_ewl,wall_nenw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles7x5IOI = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_sesw,wall_ewl,wall_ewl,wall_ewl,wall_ewl,wall_ewl,wall_nenw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_sesw,wall_ewl,wall_ewl,wall_ewl,wall_ewl,wall_ewl,wall_nenw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles6x7A = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw,null,null],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_nwl,wall_nw,null],
    [wall_se,wall_sel,floor_n,floor_n,floor_n,floor_n,floor_n,wall_nwl,wall_nw],
    [null,wall_s,floor_n,wall_nel,wall_e,wall_sel,floor_n,floor_n,wall_n],
    [null,wall_s,floor_n,wall_nwl,wall_w,wall_swl,floor_n,floor_n,wall_n],
    [wall_sw,wall_swl,floor_n,floor_n,floor_n,floor_n,floor_n,wall_nel,wall_ne],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_nel,wall_ne,null],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne,null,null]
];

var tiles6x5E = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,wall_nsel,floor_n,wall_nsel,floor_n,wall_n],
    [wall_s,floor_n,wall_nsl,floor_n,wall_nsl,floor_n,wall_n],
    [wall_s,floor_n,wall_nlse,wall_e,wall_slne,floor_n,wall_n],
    [wall_s,floor_n,wall_n,null,wall_s,floor_n,wall_n],
    [wall_se,wall_e,wall_ne,null,wall_se,wall_e,wall_ne]
];

var tiles6x7F = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_nel,floor_n,floor_n,wall_nswl,floor_n,floor_n,wall_n],
    [null,null,wall_s,floor_n,floor_n,wall_nsl,floor_n,floor_n,wall_n],
    [null,null,wall_se,wall_e,wall_e,wall_nlsw,floor_n,floor_n,wall_n],
    [null,null,null,null,null,wall_s,floor_n,floor_n,wall_n],
    [null,null,null,null,null,wall_se,wall_e,wall_e,wall_ne]
];

var tiles6x7J = [
    [null,null,null,null,null,wall_sw,wall_w,wall_w,wall_nw],
    [wall_sw,wall_w,wall_w,wall_nw,null,wall_s,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_n,null,wall_s,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nwl,wall_w,wall_swl,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_sel,floor_n,floor_n,wall_n],
    [null,null,null,null,null,wall_se,wall_e,wall_e,wall_ne]
];

var tiles6x7J2 = [
    [wall_sw,wall_w,wall_w,wall_nw,null,wall_sw,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,wall_n,null,wall_s,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nwl,wall_w,wall_swl,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_sel,floor_n,floor_n,wall_n],
    [null,null,null,null,null,wall_se,floor_n,floor_n,wall_ne],
    [null,null,null,null,null,wall_se,wall_e,wall_e,wall_ne]
];

var tiles6x6L = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,wall_nwl,wall_e,wall_e,wall_ne],
    [wall_s,floor_n,floor_n,floor_n,wall_n,null,null,null],
    [wall_s,floor_n,floor_n,floor_n,wall_n,null,null,null],
    [wall_se,wall_e,wall_e,wall_e,wall_ne,null,null]
];

var tiles6x6L2 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_nwl,wall_e,wall_ne],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n,null,null],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n,null,null],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_ne,null]
];

var tiles6x6L3 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nel,wall_e,wall_e,wall_e,wall_ne],
    [wall_s,floor_n,floor_n,wall_n,null,null,null,null],
    [wall_s,floor_n,floor_n,wall_n,null,null,null,null],
    [wall_s,floor_n,floor_n,wall_n,null,null,null,null],
    [wall_se,wall_e,wall_e,wall_ne,null,null,null]
];

var tiles7x7Snake = [
    [wall_sw,wall_w,wall_nwsw,wall_w,wall_w,wall_w,wall_nwsw,wall_w,wall_nw],
    [wall_s,floor_n,wall_nsl,floor_n,floor_n,floor_n,wall_nsl,floor_n,wall_n],
    [wall_s,floor_n,wall_nsl,floor_n,wall_nsl,floor_n,wall_nsl,floor_n,wall_n],
    [wall_s,floor_n,wall_nsl,floor_n,wall_nsl,floor_n,wall_nsl,floor_n,wall_n],
    [wall_s,floor_n,wall_nsl,floor_n,wall_nsl,floor_n,wall_nsl,floor_n,wall_n],
    [wall_s,floor_n,wall_nsl,floor_n,wall_nsl,floor_n,wall_nsl,floor_n,wall_n],
    [wall_s,floor_n,wall_nsl,floor_n,wall_nsl,floor_n,wall_nsl,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,wall_nsl,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_nese,wall_e,wall_e,wall_e,wall_ne]
];

var tiles7x7Snake2 = [
    [wall_sw,wall_w,wall_nwsw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,wall_nsl,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,wall_nsl,floor_n,wall_nelsw,wall_ewl,wall_selnw,floor_n,wall_n],
    [wall_s,floor_n,wall_nsl,floor_n,wall_nsl,floor_n,wall_nsl,floor_n,wall_n],
    [wall_s,floor_n,wall_nsl,floor_n,wall_nswl,floor_n,wall_nsl,floor_n,wall_n],
    [wall_s,floor_n,wall_nsl,floor_n,floor_n,floor_n,wall_nsl,floor_n,wall_n],
    [wall_s,floor_n,wall_nwlse,wall_ewl,wall_ewl,wall_ewl,wall_swlne,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles6x6T = [
    [null,null,null,null,wall_sw,wall_w,wall_w,wall_nw],
    [null,null,null,null,wall_s,floor_n,floor_n,wall_n],
    [wall_sw,wall_w,wall_w,wall_w,wall_swl,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_sel,floor_n,floor_n,wall_n],
    [null,null,null,null,wall_s,floor_n,floor_n,wall_n],
    [null,null,null,null,wall_se,wall_e,wall_e,wall_ne]
];

var STANDARD_CHOICE_POOL = [
    { type:"getScore", opt:{ number:300} },
    { type:"getFullHp" },
    { type:"getRandomMove", opt:{ from:3, to:5} },
    { type:"getRandomTime", opt:{ from:10, to:20} },
    { type:"getCard", opt:{type:"heal"}},
    { type:"getCard", opt:{type:"tail-slash"}},
//    { type:"getCard", opt:{type:"vertical-fire"}},
//    { type:"getCard", opt:{type:"horizontal-fire"}},
//    { type:"getCard", opt:{type:"cross-fire"}},
//    { type:"getCard", opt:{type:"whirl-slash"}},
    { type:"reduceRandomWait", opt:{ from:4, to:6}},
    { type:"reduceAllWait"},
    { type:"levelUpCard"}
]

var STANDARD_ITEM_POOL = ["potion","money"];

var rooms = [];

//无尽关卡
var infiniteRoom = { 
    stageNumber: 0,
    scoreCondition: null,
    winEveryConditions:[
    ],
    loseAnyConditions:[],
    rules:{
    },
    genEnemyStrategy: [{type:"infinite", number: 2, last: 0}],
    baseEnemyPool:[{ type:"pudding", subtype:"red"},
        {type:"cherrycake"},
        {type:"ricecake"},
        {type:"icecream"},
        {type:"creampuff"},
        {type:"souffle"},
        {type:"archer"}
    ],
    enemyPool:[{
        type:"pudding", subtype:"red"
    },{
        type:"pudding", subtype:"yellow"
    },{
        type:"pudding", subtype:"blue"
    }],
    itemPool:STANDARD_ITEM_POOL,
    initTiles: tiles5x5,
    initMovables:[],
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
        } //normal, fix
    },
    choicePool: _.union(STANDARD_CHOICE_POOL, [
        { type:"getCard", opt:{type:"luck"}},
        { type:"getCard", opt:{type:"constitution"}},
        { type:"getCard", opt:{type:"cunning"}},
        { type:"getCard", opt:{type:"dexterity"}},
        { type:"getCard", opt:{type:"dodge"}}
    ])
};

//初始 room1
rooms.push({
    stageNumber: 1,
    turnLimit:6,
    scoreCondition: null,
    winEveryConditions:[
        "outOfTurn"
    ],
    loseAnyConditions:[],
    rules:{
        heroCanGetExp: false
    },
    enemyPool:[{type:"pudding", subtype:"red"},{type:"pudding", subtype:"yellow"},{type:"pudding", subtype:"blue"}],
    initTiles: tiles5x5,
    initMovables:[
        {type:"pudding",subtype:"yellow", positions: [{x:3,y:2}]},
        {type:"pudding",subtype:"red", positions: [{x:2,y:2}]},
        {type:"pudding",subtype:"blue", positions: [{x:1,y:2}]},
        {type:"pudding",subtype:"yellow", positions: [{x:3,y:1}]},
        {type:"pudding",subtype:"red", positions: [{x:2,y:1}]},
        {type:"pudding",subtype:"blue", positions: [{x:1,y:1}]}
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
        } //normal, fix
    }
});

//教学杀敌数过关，分数无要求 room2
rooms.push({ 
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
    enemyPool:[
        {type:"pudding", subtype:"red"},
        {type:"pudding", subtype:"yellow"},
        {type:"pudding", subtype:"blue"},
        {type:"pudding", subtype:"green"}
        ],
    initTiles:tiles7x4,
    initMovables:[
        {type:"pudding",subtype:"red",positions: [{x:1,y:1}]},
        {type:"pudding",subtype:"yellow",positions: [{x:2,y:1}]},
        {type:"pudding",subtype:"green",positions: [{x:3,y:1}]},
        {type:"pudding",subtype:"blue",positions: [{x:4,y:1}]}
        ],
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
        } //normal, fix
    }
});

//教学杀敌数过关，且有分数要求 room3
rooms.push({ 
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
    enemyPool:[
        {type:"pudding",subtype:"red"},
        {type:"pudding",subtype:"yellow"},
        {type:"pudding",subtype:"blue"},
        {type:"pudding",subtype:"green"}
        ],
    initTiles:tiles6x4,
    initMovables:[
        {type:"pudding",subtype:"red",positions: [{x:1,y:1}]},
        {type:"pudding",subtype:"yellow",positions: [{x:2,y:1}]},
        {type:"pudding",subtype:"green",positions: [{x:3,y:1}]},
        {type:"pudding",subtype:"blue",positions: [{x:4,y:1}]},
        {type:"pudding",subtype:"red",positions: [{x:1,y:2}]},
        {type:"pudding",subtype:"yellow",positions: [{x:2,y:2}]},
        {type:"pudding",subtype:"green",positions: [{x:3,y:2}]},
        {type:"pudding",subtype:"blue",positions: [{x:4,y:2}]}
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
        } //normal, fix
    }
});

//教学获得经验和升级 room4
rooms.push({ 
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
    },
    enemyPool:[{
        type:"pudding",subtype:"red"
    },{
        type:"pudding",subtype:"yellow"
    },{
        type:"pudding",subtype:"blue"
    },{
        type:"pudding",subtype:"green"
    }],
    initTiles:tiles6x6Rhombus,
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
        } //normal, fix
    },
    initHand:[],
    choicePool:STANDARD_CHOICE_POOL,
    unlocks: ["shop-entry"]
});

//第一次要求大量杀敌 room5
rooms.push({ 
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
        } //normal, fix
    },
    choicePool:STANDARD_CHOICE_POOL
});

//第一次出现樱桃蛋糕 room6
rooms.push({ 
    turnLimit:15,
    scoreCondition: [300, 600, 1000],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"cherrycake",
            number: 10
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"cherrycake"
    },{
        type:"pudding",subtype:"yellow"
    },{
        type:"pudding",subtype:"green"
    }],
    initTiles:tiles5x5,
    initMovables:[
        {
            type:"cherrycake",
            positions: [{x:2,y:2}]
        },
        {
            type:"cherrycake",
            positions: [{x:4,y:2}]
        },
        {
            type:"cherrycake",
            positions: [{x:2,y:4}]
        },
        {
            type:"cherrycake",
            positions: [{x:4,y:4}]
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
        } //normal, fix
    },
    choicePool:STANDARD_CHOICE_POOL
});

//第一次出现回复药和道具掉落 room7
rooms.push({ 
    turnLimit:10,
    scoreCondition: [200, 350, 500],
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
        type:"pudding",subtype:"green"
    }],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles5x6,
    initMovables:[
        {
            type:"potion",
            positions: [{x:2,y:2}]
        },
        {
            type:"potion",
            positions: [{x:4,y:2}]
        },
        {
            type:"potion",
            positions: [{x:2,y:4}]
        },
        {
            type:"potion",
            positions: [{x:4,y:4}]
        }
    ],
    initHero: {
        type:"normalHero",
        positions: [{x:3,y:3}],
        initHp: 10,
        initMaxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        } //normal, fix
    },
    choicePool:STANDARD_CHOICE_POOL
});

//A room8 第一次时间限制
rooms.push({ 
    timeLimit:120,
    scoreCondition: [400, 700, 1000],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"pudding",subtype:"red",
            number: 6
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype:"yellow",
            number: 6
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype:"green",
            number: 6
        }
    ],
    loseAnyConditions:[
        "outOfTime"
    ],
    enemyPool:[{
        type:"pudding",subtype:"red"
    },{
        type:"pudding",subtype:"yellow"
    },{
        type:"pudding",subtype:"green"
    }],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x6T,
    initMovables:[],
    initHero: {
        type:"normalHero",
        positions: [{x:3,y:6}],
        initHp: 100,
        initMaxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        } //normal, fix
    },
    choicePool:STANDARD_CHOICE_POOL
});

//第一次出现年糕 room9
rooms.push({ 
    turnLimit:15,
    scoreCondition: [300, 500, 800],
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
    itemPool:STANDARD_ITEM_POOL,
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
        } //normal, fix
    },
    choicePool:STANDARD_CHOICE_POOL
});

//第一次要求敌人等级　room10
rooms.push({ 
    turnLimit:30,
    scoreCondition: [1000, 2000, 3000],
    winEveryConditions:[
        {
            conditionType:"kill-max-level",
            type:"pudding",subtype: "yellow",
            number: 5
        },
        {
            conditionType:"kill-max-level",
            type:"pudding",subtype: "blue",
            number: 5
        },
        {
            conditionType:"kill-max-level",
            type:"pudding",subtype: "green",
            number: 5
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"pudding",subtype:"yellow"
    },{
        type:"pudding",subtype:"blue"
    },{
        type:"pudding",subtype:"green"
    }],
    genEnemyStrategy: [{type:"random", number: 3, last: 0}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x6,
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
        } //normal, fix
    },
    choicePool:STANDARD_CHOICE_POOL
});

//柱子 room11
rooms.push({ 
    turnLimit:20,
    scoreCondition: [400, 800, 1200],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "red",
            number: 5
        },
        {
            conditionType:"kill-level",
            type:"ricecake",
            number: 5
        },
        {
            conditionType:"kill-level",
            type:"cherrycake",
            number: 5
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"pudding",subtype:"red"
    },{
        type:"ricecake"
    },{
        type:"cherrycake"
    }],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x6Cross6x4,
    initMovables:[
        {
            type:"pillar",subtype:"normal",
            positions: [{x:2,y:2}]
        },
        {
            type:"pillar",subtype:"normal",
            positions: [{x:5,y:2}]
        },
        {
            type:"pillar",subtype:"normal",
            positions: [{x:2,y:5}]
        },
        {
            type:"pillar",subtype:"normal",
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
        } //normal, fix
    },
    choicePool:STANDARD_CHOICE_POOL
});

//room12 大量杀敌
rooms.push({ 
    turnLimit:35,
    scoreCondition: [1000, 2000, 3000],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "red",
            number: 16
        },
        {
            conditionType:"kill-level",
            type:"ricecake",
            number: 16
        },
        {
            conditionType:"kill-level",
            type:"cherrycake",
            number: 16
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"pudding",subtype:"red"
    },{
        type:"ricecake"
    },{
        type:"cherrycake"
    }],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x5HRotate90,
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
        } //normal, fix
    },
    choicePool:STANDARD_CHOICE_POOL
});

//复杂地形要求敌人等级room13
rooms.push({ 
    turnLimit:21,
    scoreCondition: [800, 1500, 2000],
    winEveryConditions:[
        {
            conditionType:"kill-max-level",
            type:"pudding",subtype: "red",
            number: 3
        },
        {
            conditionType:"kill-max-level",
            type:"pudding",subtype: "yellow",
            number: 3
        },
        {
            conditionType:"kill-max-level",
            type:"pudding",subtype: "blue",
            number: 3
        },
        {
            conditionType:"kill-max-level",
            type:"pudding",subtype: "green",
            number: 3
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
        type:"pudding",subtype:"blue"
    },{
        type:"pudding",subtype:"green"
    }],
    itemPool:STANDARD_ITEM_POOL,
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
        } //normal, fix
    },
    choicePool:STANDARD_CHOICE_POOL
});

//room14 大量杀敌
rooms.push({ 
    turnLimit:25,
    scoreCondition: [2000, 3000, 4500],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "red",
            number: 20
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "yellow",
            number: 20
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "blue",
            number: 20
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
        type:"pudding",subtype:"blue"
    }],
    itemPool:STANDARD_ITEM_POOL,
    genEnemyStrategy: [{type:"random", number: 4, last: 0}],
    initTiles:tiles7x7Rhombus,
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
        } //normal, fix
    },
    choicePool:STANDARD_CHOICE_POOL,
    initHand:[
        {type:"whirl-slash"}
    ],
    unlocks:[{type:"shop", subtype:"whirl-slash"}]
});

//room15 第一次出现法师
rooms.push({ 
    turnLimit:15,
    scoreCondition: [600, 900, 1200],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"icecream",
            number: 7
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"cherrycake"
    },{
        type:"pudding",subtype:"yellow"
    },{
        type:"icecream"
    }],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles7x7Triangle,
    initMovables:[
        { type:"icecream", positions: [{x:1,y:7}] },
        { type:"icecream", positions: [{x:7,y:1}] },
        { type:"icecream", positions: [{x:7,y:7}] }
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
        } //normal, fix
    },
    choicePool:STANDARD_CHOICE_POOL
});

//room16 第一次出现creampuff
rooms.push({ 
    turnLimit:15,
    scoreCondition: [1000, 1500, 2000],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"creampuff",
            number: 16
        },
        {
            conditionType:"kill-level",
            type:"cherrycake",
            number: 7
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    rules:{
    },
    enemyPool:[{
        type:"creampuff"
    },{
        type:"cherrycake"
    },{
        type:"pudding",subtype:"green"
    }],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x6Cross6x2,
    initMovables:[
        {
            type:"creampuff",
            positions: [{x:1,y:3}]
        },
        {
            type:"creampuff",
            positions: [{x:2,y:3}]
        },
        {
            type:"creampuff",
            positions: [{x:5,y:4}]
        },
        {
            type:"creampuff",
            positions: [{x:6,y:4}]
        },
        {
            type:"creampuff",
            positions: [{x:4,y:1}]
        },
        {
            type:"creampuff",
            positions: [{x:4,y:2}]
        },
        {
            type:"creampuff",
            positions: [{x:3,y:5}]
        },
        {
            type:"creampuff",
            positions: [{x:3,y:6}]
        }
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
        } //normal, fix
    },
    choicePool:STANDARD_CHOICE_POOL
});

//room17 ice and fire
rooms.push({ 
    turnLimit:28,
    scoreCondition: [1000, 1500, 2000],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"creampuff",
            number: 10
        },
        {
            conditionType:"kill-level",
            type:"icecream",
            number: 10
        },
        {
            conditionType:"kill-level",
            type:"cherrycake",
            number: 10
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    rules:{
    },
    enemyPool:[{
        type:"creampuff"
    },{
        type:"icecream"
    },{
        type:"cherrycake"
    }],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x6Whirl,
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
        } //normal, fix
    },
    choicePool:STANDARD_CHOICE_POOL
});

//room18 第一次出现souffle
rooms.push({ 
    turnLimit:10,
    scoreCondition: [1500, 2000, 2500],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"souffle",
            number: 12
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    rules:{
    },
    enemyPool:[{
        type:"pudding",subtype:"red"
    },{
        type:"souffle"
    },{
        type:"cherrycake"
    }],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x6Whirl2,
    initMovables:[
        {
            type:"souffle",
            positions: [{x:1,y:1}]
        },
        {
            type:"souffle",
            positions: [{x:2,y:1}]
        },
        {
            type:"souffle",
            positions: [{x:6,y:1}]
        },
        {
            type:"souffle",
            positions: [{x:6,y:2}]
        },
        {
            type:"souffle",
            positions: [{x:1,y:5}]
        },
        {
            type:"souffle",
            positions: [{x:1,y:6}]
        },
        {
            type:"souffle",
            positions: [{x:5,y:6}]
        },
        {
            type:"souffle",
            positions: [{x:6,y:6}]
        }
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
        } //normal, fix
    },
    choicePool:STANDARD_CHOICE_POOL
});

//room19 第一次出现滚木
rooms.push({ 
    turnLimit:12,
    scoreCondition: [800, 1200, 1600],
    winEveryConditions:[
        {
            conditionType:"kill-max-level",
            type:"pudding",subtype: "red",
            number: 3
        },
        {
            conditionType:"kill-max-level",
            type:"pudding",subtype: "yellow",
            number: 3
        },
        {
            conditionType:"kill-max-level",
            type:"pudding",subtype: "blue",
            number: 3
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    genEnemyStrategy: [{type:"random", number: 3, last: 0}],
    enemyPool:[{
        type:"pudding", subtype:"red"
    },{
        type:"pudding", subtype:"yellow"
    },{
        type:"pudding", subtype:"blue"
    }],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x5,
    initMovables:[{
        type:"vertical-log3",subtype:"normal",
        positions:[
            {x:2,y:4},
            {x:2,y:3},
            {x:2,y:2}
        ]
    }],
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
        } //normal, fix
    },
    choicePool:STANDARD_CHOICE_POOL
});

//room20 吃年糕啊
rooms.push({ 
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
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x6,
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
        } //normal, fix
    },
    choicePool:STANDARD_CHOICE_POOL
});

//第一次出现archer 对远程兵种的生存1 room21
rooms.push({ 
    turnLimit:25,
    scoreCondition: [400, 800, 1200],
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
        type:"archer"
    }],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x5IO,
    initMovables:[
        { type:"archer", positions: [{x:6,y:1}] },
        { type:"archer", positions: [{x:6,y:5}] }],
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
        } //normal, fix
    },
    choicePool:STANDARD_CHOICE_POOL,
    unlocks:["infinite"]
});

//第一次出现chocolate cake room22
rooms.push({
    turnLimit:18,
    scoreCondition: [1000, 1300, 1800],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"chocolate-cake",
            number: 10
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"cherrycake"
    },{
        type:"chocolate-cake"
    },{
        type:"pudding", subtype:"red"
    }],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles4x6,
    initMovables:[
        { type:"chocolate-cake", positions: [{x:1,y:1}] },
        { type:"chocolate-cake", positions: [{x:1,y:6}] },
        { type:"chocolate-cake", positions: [{x:4,y:1}] },
        { type:"chocolate-cake", positions: [{x:4,y:6}] }
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
        } //normal, fix
    },
    choicePool:STANDARD_CHOICE_POOL,
    unlocks:[{type:"enemy", subtype:"chocolate-cake"}]
});

//对远程兵种的生存2 room23
rooms.push({ 
    turnLimit:20,
    scoreCondition: [500, 800, 1200],
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
        type:"archer"
    }],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles7x5IOI,
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
        } //normal, fix
    },
    choicePool:STANDARD_CHOICE_POOL
});

//room24 难行
rooms.push({ 
    turnLimit:30,
    scoreCondition: [800, 1500, 2000],
    winEveryConditions:[
        {
            conditionType:"kill-max-level",
            type:"cherrycake",
            number: 5
        },
        {
            conditionType:"kill-max-level",
            type:"icecream",
            number: 5
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"cherrycake"
    },{
        type:"ricecake"
    },{
        type:"icecream"
    }],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x6Loop,
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
        } //normal, fix
    },
    choicePool:STANDARD_CHOICE_POOL
});

//room25 双滚木
rooms.push({
    turnLimit:18,
    scoreCondition: [1000, 1300, 1600],
    winEveryConditions:[
        {
            conditionType:"kill-max-level",
            type:"pudding",subtype: "red",
            number: 4
        },
        {
            conditionType:"kill-max-level",
            type:"pudding",subtype: "yellow",
            number: 4
        },
        {
            conditionType:"kill-max-level",
            type:"pudding",subtype: "blue",
            number: 4
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    genEnemyStrategy: [{type:"random", number: 3, last: 0}],
    enemyPool:[{
        type:"pudding", subtype:"red"
    },{
        type:"pudding", subtype:"yellow"
    },{
        type:"pudding", subtype:"blue"
    }],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x6,
    initMovables:[{
        type:"vertical-log2",subtype:"normal",
        positions:[{x:1,y:4},{x:1,y:3}]
    },{
        type:"horizontal-log2",subtype:"normal",
        positions:[{x:3,y:6},{x:4,y:6}]
    }],
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
        } //normal, fix
    },
    choicePool:STANDARD_CHOICE_POOL
});

//对远程兵种的生存3 room26
rooms.push({ 
    turnLimit:25,
    scoreCondition: [400, 900, 1400],
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
        type:"archer"
    }],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x6Mi,
    initMovables:[
        { type:"archer", positions: [{x:1,y:1}] },
        { type:"archer", positions: [{x:1,y:6}] },
        { type:"archer", positions: [{x:6,y:1}] },
        { type:"archer", positions: [{x:6,y:6}] }
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
        } //normal, fix
    },
    choicePool:STANDARD_CHOICE_POOL
});

//room27 A shape stronger enemy, want high level, danger
rooms.push({ 
    turnLimit:35,
    scoreCondition: [1500, 2000, 2500],
    winEveryConditions:[
        {
            conditionType:"kill-max-level",
            type:"chocolate-cake",
            number: 10
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"souffle"
    },{
        type:"creampuff"
    },{
        type:"chocolate-cake"
    }],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x7A,
    initMovables:[],
    initHero: {
        type:"normalHero",
        positions: [{x:3,y:6}],
        initHp: 100,
        initMaxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        } //normal, fix
    },
    choicePool:STANDARD_CHOICE_POOL
});

//room28 snake
rooms.push({ 
    turnLimit:25,
    scoreCondition: [600, 1000, 1400],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"ricecake",
            number: 6
        },
        {
            conditionType:"kill-level",
            type:"cherrycake",
            number: 6
        },
        {
            conditionType:"kill-level",
            type:"archer",
            number: 6
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"cherrycake"
    },{
        type:"ricecake"
    },{
        type:"archer"
    }],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles7x7Snake,
    initMovables:[],
    initHero: {
        type:"normalHero",
        positions: [{x:4,y:5}],
        initHp: 100,
        initMaxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        } //normal, fix
    },
    initHand:[
        {type:"cross-fire"}
    ],
    choicePool:STANDARD_CHOICE_POOL,
    unlocks:[{type:"shop", subtype:"cross-fire"}]
});

//room29 log in h
rooms.push({ 
    turnLimit:24,
    scoreCondition: [1400, 1800, 2200],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"icecream",
            number: 8
        },
        {
            conditionType:"kill-level",
            type:"creampuff",
            number: 8
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "blue",
            number: 8
        },
        {
            conditionType:"kill-level",
            type:"cherrycake",
            number: 8
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    genEnemyStrategy: [{type:"random", number: 3, last: 0}],
    enemyPool:[{
        type:"cherrycake"
    },{
        type:"creampuff"
    },{
        type:"icecream"
    },{
        type:"pudding", subtype:"blue"
    }],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x6H,
    initMovables:[{
        type:"horizontal-log4",subtype:"normal",
        positions:[
            {x:2,y:5},{x:3,y:5},{x:4,y:5},{x:5,y:5}
        ]
    }],
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
        } //normal, fix
    },
    choicePool:STANDARD_CHOICE_POOL
});

//romm30 第一次出现 donut
rooms.push({
    turnLimit:25,
    scoreCondition: [1000, 1400, 1800],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"donut",
            number: 6
        },
        {
            conditionType:"kill-level",
            type:"cherrycake",
            number: 6
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"cherrycake"
    },{
        type:"donut"
    },{
        type:"chocolate-cake"
    }],
    itemPool:STANDARD_ITEM_POOL,
    genEnemyStrategy: [{type:"random", number: 2, last: 0}],
    initTiles:tiles5x5Loop,
    initMovables:[
        { type:"donut", positions:[{x:1,y:1}]},
        { type:"donut", positions:[{x:1,y:5}]},
        { type:"donut", positions:[{x:5,y:1}]},
        { type:"donut", positions:[{x:5,y:5}]}
    ],
    initHand:[
    ],
    initHero: {
        type:"normalHero",
        positions: [{x:3,y:5}],
        initHp: 100,
        initMaxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        } //normal, fix
    },
    choicePool:STANDARD_CHOICE_POOL,
    unlocks:[{type:"enemy", subtype:"donut"}]
});

//room31 snake
rooms.push({ 
    turnLimit:25,
    scoreCondition: [600, 1000, 1400],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"cherrycake",
            number: 6
        },
        {
            conditionType:"kill-level",
            type:"ricecake",
            number: 6
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype:"green",
            number: 6
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"cherrycake"
    },{
        type:"ricecake"
    },{
        type:"pudding",subtype:"green"
    }],
    itemPool:STANDARD_ITEM_POOL,
    genEnemyStrategy: [{type:"random", number: 3, last: 0}],
    initTiles:tiles7x7Snake2,
    initMovables:[],
    initHand:[
    ],
    initHero: {
        type:"normalHero",
        positions: [{x:3,y:5}],
        initHp: 100,
        initMaxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        } //normal, fix
    },
    choicePool:STANDARD_CHOICE_POOL
});

//room32 snake
rooms.push({
    turnLimit:25,
    scoreCondition: [600, 1000, 1400],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"jelly",
            number: 9
        },
        {
            conditionType:"kill-level",
            type:"souffle",
            number: 9
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"jelly"
    },{
        type:"souffle"
    },{
        type:"chocolate-cake"
    }],
    itemPool:STANDARD_ITEM_POOL,
    genEnemyStrategy: [{type:"random", number: 3, last: 0}],
    initTiles:tiles6x5N,
    initMovables:[
        { type:"jelly", positions:[{x:1,y:1}]},
        { type:"jelly", positions:[{x:6,y:5}]}
    ],
    initHand:[
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
        } //normal, fix
    },
    choicePool:STANDARD_CHOICE_POOL,
    unlocks:[{type:"enemy", subtype:"jelly"}]
});

//room33 danger
rooms.push({
    turnLimit:20,
    scoreCondition: [1000, 1400, 1800],
    winEveryConditions:[
        "outOfTurn"
    ],
    loseAnyConditions:[
    ],
    enemyPool:[{
        type:"jelly"
    },{
        type:"donut"
    },{
        type:"chocolate-cake"
    }],
    itemPool:STANDARD_ITEM_POOL,
    genEnemyStrategy: [{type:"random", number: 3, last: 0}],
    initTiles:tiles7x5,
    initMovables:[],
    initHand:[
    ],
    initHero: {
        type:"normalHero",
        positions: [{x:4,y:3}],
        initHp: 50,
        initMaxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        } //normal, fix
    },
    choicePool:STANDARD_CHOICE_POOL
});

//room34 jelly max level
rooms.push({
    turnLimit:24,
    scoreCondition: [800, 1400, 2000],
    winEveryConditions:[
        {
            conditionType:"kill-max-level",
            type:"jelly",
            number: 10
        }
    ],
    loseAnyConditions:[
    ],
    enemyPool:[{
        type:"jelly"
    },{
        type:"souffle"
    },{
        type:"cherrycake"
    }],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x6Loop2,
    initMovables:[],
    initHand:[
    ],
    initHero: {
        type:"normalHero",
        positions: [{x:3,y:2}],
        initHp: 30,
        initMaxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        }
    },
    choicePool:STANDARD_CHOICE_POOL
});

//room35 enemy recovery skill card
rooms.push({
    turnLimit:30,
    scoreCondition: [2000, 2500, 3000],
    winEveryConditions:[
        "outOfTurn"
    ],
    loseAnyConditions:[
    ],
    enemyPool:[{
        type:"ricecake"
    },{
        type:"donut"
    },{
        type:"chocolate-cake"
    }],
    enemyLevelPool:[1,2],
    itemPool:STANDARD_ITEM_POOL,
    genEnemyStrategy: [{type:"random", number: 3, last: 0}],
    initTiles:tiles7x7Cross7x3,
    initMovables:[],
    initHero: {
        type:"normalHero",
        positions: [{x:4,y:4}],
        initHp: 30,
        initMaxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        } //normal, fix
    },
    choicePool:_.union(STANDARD_CHOICE_POOL,[
        { type:"getCard", opt:{type:"recovery"}}
        ]),
    unlocks: [{type:"shop", subtype:"recovery"}]
});

//room36 icecream donut
rooms.push({
    turnLimit:27,
    scoreCondition: [1500, 2000, 2500],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"icecream",
            number: 12
        },
        {
            conditionType:"kill-level",
            type:"donut",
            number: 12
        },
        {
            conditionType:"kill-level",
            type:"jelly",
            number: 12
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"icecream"
    },{
        type:"donut"
    },{
        type:"jelly"
    }],
    levelPool:[1,2],
    itemPool:STANDARD_ITEM_POOL,
    genEnemyStrategy: [{type:"random", number: 3, last: 0}],
    initTiles:tiles6x5E,
    initMovables:[],
    initHero: {
        type:"normalHero",
        positions: [{x:2,y:3}],
        initHp: 100,
        initMaxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        } //normal, fix
    },
    choicePool:STANDARD_CHOICE_POOL
});

//room37 ricecake max level
rooms.push({
    turnLimit:27,
    scoreCondition: [1500, 1800, 2100],
    winEveryConditions:[
        {
            conditionType:"kill-max-level",
            type:"ricecake",
            number: 6
        },
        {
            conditionType:"kill-max-level",
            type:"souffle",
            number: 15
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"ricecake"
    },{
        type:"souffle"
    }],
    levelPool:[1,2,3],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x6,
    initMovables:[],
    initHero: {
        type:"normalHero",
        positions: [{x:2,y:4}],
        initHp: 100,
        initMaxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        } //normal, fix
    },
    choicePool:STANDARD_CHOICE_POOL
});

//room38 持久战
rooms.push({ 
    turnLimit:50,
    scoreCondition: [4000, 6000, 7000],
    winEveryConditions:[
        "outOfTurn"
    ],
    loseAnyConditions:[
    ],
    enemyPool:[{type:"donut"},{type:"cherrycake"},{type:"chocolate-cake"}],
    genEnemyStrategy: [{type:"random", number: 3, last: 0}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x6UpArrow2,
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
        } //normal, fix
    },
    choicePool:STANDARD_CHOICE_POOL,
    initHand:[
        {type:"big-whirl-slash"}
    ],
    unlocks:[{type:"shop", subtype:"big-whirl-slash"}]
});

//room39 L icecream and jelly
rooms.push({ 
    timeLimit:90,
    scoreCondition: [1000, 1400, 1700],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"jelly",
            number: 10
        },
        {
            conditionType:"kill-level",
            type:"icecream",
            number: 10
        }
    ],
    loseAnyConditions:[
        "outOfTime"
    ],
    enemyPool:[{type:"jelly"},{type:"icecream"},{type:"pudding",subtype:"blue"}],
    genEnemyStrategy: [{type:"random", number: 3, last: 0}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x6L3,
    initMovables:[],
    initHero: {
        type:"normalHero",
        positions: [{x:2,y:2}],
        initHp: 100,
        initMaxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        } //normal, fix
    },
    choicePool:STANDARD_CHOICE_POOL
});

//room40 D archer max-level
rooms.push({ 
    turnLimit:27,
    scoreCondition: [800, 1200, 1400],
    winEveryConditions:[
        {
            conditionType:"kill-max-level",
            type:"archer",
            number: 8
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"jelly"
    },{
        type:"archer"
    },{
        type:"pudding",subtype:"blue"
    }],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles7x7D,
    initMovables:[],
    initHero: {
        type:"normalHero",
        positions: [{x:2,y:4}],
        initHp: 100,
        initMaxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        } //normal, fix
    },
    choicePool:STANDARD_CHOICE_POOL
});

//room40 C unlock cooldown
rooms.push({ 
    turnLimit:27,
    scoreCondition: [1700, 2200, 2700],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"archer",
            number: 9
        },
        {
            conditionType:"kill-level",
            type:"icecream",
            number: 9
        },
        {
            conditionType:"kill-level",
            type:"ricecake",
            number: 9
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{type:"icecream"},{type:"archer"},{type:"ricecake"}],
    genEnemyStrategy: [{type:"random", number: 3, last: 0}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x6C,
    initMovables:[],
    initHero: {
        type:"normalHero",
        positions: [{x:2,y:3}],
        initHp: 100,
        initMaxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        } //normal, fix
    },
    initHand:[ {type:"vertical-fire"}, {type:"cooldown"} ],
    choicePool:STANDARD_CHOICE_POOL,
    unlocks:[{type:"shop", subtype:"cooldown"}]
});
