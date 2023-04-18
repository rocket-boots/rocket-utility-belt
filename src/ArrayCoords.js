import clamp from './clamp.js';
import { PI, DEGREES_PER_RADIAN } from './constants.js';
// Constants
const NORTH = 0;
const EAST = 1;
const SOUTH = 2;
const WEST = 3;
const X = 0;
const Y = 1;
const Z = 2;
const DIRECTION_NAMES = Object.freeze(['North', 'East', 'South', 'West']);
const DIRECTIONS = Object.freeze([NORTH, EAST, SOUTH, WEST]);
const FACING_RADIANS = Object.freeze([0, PI * 0.5, PI, PI * 1.5]);

//       /^\ -y North
// West   |
// -x <---o---> +x East
//        |
//       \./ +y South

class ArrayCoords {
	static getRelativeCoordsInDirection(coords, facing, forward = 0, strafe = 0, up = 0) {
		const newCoords = [...coords];
		const facingEastWest = (facing % 2);
		const forwardAxis = facingEastWest ? X : Y;
		const strafeAxis = facingEastWest ? Y : X;
		const forwardDirection = (facing === NORTH || facing === WEST) ? -1 : 1;
		const strafeDirection = (facing === NORTH || facing === EAST) ? 1 : -1;
		newCoords[forwardAxis] += (forward * forwardDirection);
		newCoords[strafeAxis] += (strafe * strafeDirection);
		newCoords[Z] += up;
		return newCoords;
	}

	static normalizeDirection(facing) {
		const fixedFacing = facing % DIRECTIONS.length;
		return (fixedFacing < 0) ? (DIRECTIONS.length + fixedFacing) : fixedFacing;
	}

	static getDirectionName(facingParam) {
		const facing = ArrayCoords.normalizeDirection(facingParam);
		return DIRECTION_NAMES[facing];
	}

	static getDirectionRadians(facingParam) {
		const facing = ArrayCoords.normalizeDirection(facingParam);
		return FACING_RADIANS[facing];
	}

	static getDistance(coords1, coords2) {
		return Math.sqrt(
			(coords2[X] - coords1[X]) ** 2
			+ (coords2[Y] - coords1[Y]) ** 2
			+ (coords2[Z] - coords1[Z]) ** 2,
		);
	}

	/**
	 * Get angle (in radians) from one 2d point to another;
	 * e.g., From 0,0 to 0,1 (up) --> 0 ...to 1,0 (right) --> half pi ...to 0,-1 (below) --> pi
	 */
	static getAngleFacing(coords1, coords2) {
		const dx = coords2[X] - coords1[X];
		const dy = coords2[Y] - coords1[Y];
		return Math.atan2(dx, dy);
	}

	static checkEqual(coords1, coords2) {
		return (coords1[X] === coords2[X] && coords1[Y] === coords2[Y] && coords1[Z] === coords2[Z]);
	}

	static subtract(coords1, coords2) {
		return [coords1[X] - coords2[X], coords1[Y] - coords2[Y], coords1[Z] - coords2[Z]];
	}

	static add(coords1, coords2) {
		return [coords1[X] + coords2[X], coords1[Y] + coords2[Y], coords1[Z] + coords2[Z]];
	}

	static multiply(coords, m) {
		return [
			coords[X] * m,
			coords[Y] * m,
			coords[Z] * m,
		];
	}

	static clampEachCoord(coords, min, max) {
		return [
			clamp(coords[X], min, max),
			clamp(coords[Y], min, max),
			clamp(coords[Z], min, max),
		];
	}

	static radiansToDegrees(radians) {
		// return (radians * DEGREES_PER_RADIAN) - 90;
		return (radians * DEGREES_PER_RADIAN);
	}

	static degreesToRadians(deg) {
		// return (deg + 90) / DEGREES_PER_RADIAN;
		return deg / DEGREES_PER_RADIAN;
	}

	// Note: currently only 2d
	static cartesianToPolar([x = 0, y = 0]) {
		const r = Math.sqrt(x * x + y * y);
		const radians = ArrayCoords.cartesianToRadians([x, y]);
		const degrees = ArrayCoords.radiansToDegrees(radians);
		return { r, radians, theta: radians, degrees };
	}

	static polarToCartesian(r, radians) {
		const x = r * Math.cos(radians);
		const y = r * Math.sin(radians);
		return [x, y];
	}

	// Note: currently only 2d
	static cartesianToRadians([x = 0, y = 0]) {
		return Math.atan2(y, x);
	}

	// Note: currently only 2d
	static cartesianToDegrees([x = 0, y = 0]) {
		return ArrayCoords.radiansToDegrees(ArrayCoords.cartesianToRadians([x, y]));
	}
}

// Indices
ArrayCoords.X = X;
ArrayCoords.Y = Y;
ArrayCoords.Z = Z;
ArrayCoords.NORTH = NORTH;
ArrayCoords.EAST = EAST;
ArrayCoords.SOUTH = SOUTH;
ArrayCoords.WEST = WEST;
ArrayCoords.DIRECTIONS = DIRECTIONS;
// window.ArrayCoords = ArrayCoords;

export default ArrayCoords;
