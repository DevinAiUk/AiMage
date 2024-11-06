import { HttpError } from 'wasp/server'

export const getFunnel = async ({ id }, context) => {
  if (!context.user) { throw new HttpError(401) }
  const funnel = await context.entities.Funnel.findUnique({
    where: { id },
    include: { user: true }
  });
  if (!funnel) throw new HttpError(404, 'No funnel with id ' + id);
  if (funnel.userId !== context.user.id) throw new HttpError(400, 'Funnel does not belong to the current user.');
  return funnel;
}

export const listFunnels = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Funnel.findMany({
    where: {
      userId: context.user.id
    }
  });
}
