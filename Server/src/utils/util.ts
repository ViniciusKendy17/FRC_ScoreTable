/**
 * Here are all the global functions used to treat commom prisma or typescript errors
 */

import { Prisma } from "../generated/prisma";

class NotFoundException extends Error {}

function tryFunc(block: () => void) {
  try {
    return block();
  } catch (error) {
    if (error instanceof Prisma.PrismaClientInitializationError) {
      console.error(error.message);
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(error.message);
    }

    if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      console.error(error.message);
    }

    if (error instanceof NotFoundException) {
      console.error(error.message);
    }

    console.error(error);
  }
}
