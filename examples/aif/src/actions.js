import { HttpError } from 'wasp/server'

export const createFunnel = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  const newFunnel = await context.entities.Funnel.create({
    data: {
      title: args.title,
      userId: context.user.id
    }
  });
  return newFunnel;
}

export const addStep = async ({ funnelId, content }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const funnel = await context.entities.Funnel.findUnique({
    where: { id: funnelId }
  });
  if (!funnel || funnel.userId !== context.user.id) { throw new HttpError(403) };

  await context.entities.Step.create({
    data: {
      content,
      funnelId
    }
  });

  return await context.entities.Funnel.findUnique({
    where: { id: funnelId },
    include: { steps: true }
  });
}
