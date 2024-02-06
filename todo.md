- Resolver todos os challenges




export const canCreateInvitation = async (email: string, agencyId: string): Promise<boolean> => {
  const existingUser = await db.user.findFirst({
    where: {
      OR: [
        { email, role: 'AGENCY_OWNER', agencyId: null },
        { email, role: { not: 'AGENCY_OWNER' }, agencyId },
      ],
    },
  });

  return !existingUser;
};










- Bug: se coloco o email do dono da agencia em add team user, ele cria mesmo assim e vai pro model Invitation e isso quebra a aplicação
resolvido criando uma querie para verificar antes de chamar o sendInvitation:
```
export const canCreateInvitation = async (email: string, agencyId: string): Promise<boolean> => {
  const existingUser = await db.user.findFirst({
    where: {
      OR: [
        { email, role: 'AGENCY_OWNER', agencyId: null },
        { email, role: { not: 'AGENCY_OWNER' }, agencyId },
      ],
    },
  });

  return !existingUser;
};

export const sendInvitation = async (
  role: Role,
  email: string,
  agencyId: string
) => {
  const canCreate = await canCreateInvitation(email, agencyId);

  if (!canCreate) {
    console.error('O e-mail já está associado a um membro existente ou ao dono da agência.');
    throw new Error('O e-mail já está associado a um membro existente ou ao dono da agência.');
  }

  // Tente criar a invitação
  const response = await db.invitation.create({
    data: { email, agencyId, role },
  });

  try {
    // Se a invitação for bem-sucedida, continue com a criação do convite Clerk
    const invitation = await clerkClient.invitations.createInvitation({
      emailAddress: email,
      redirectUrl: process.env.NEXT_PUBLIC_URL,
      publicMetadata: {
        throughInvitation: true,
        role,
      },
    });
    console.log("Invitation created successfully:", invitation);
  } catch (error) {
    console.log(error);
    // Se houver um erro na criação do convite Clerk, exclua a invitação local
    await db.invitation.delete({
      where: {
        email,
        agencyId,
      },
    });
    throw error;
  }

  return response;
};
```