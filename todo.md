- Resolver todos os challenges

- Fazer sistema de templates de sites

- Fazer sistema de ReMarketing pro whatsapp, email e sms e integrar com IA

- Fazer aba de produtos para poder criar o produto para vender no site

- Analisar features para implementar desse site https://kirvano.com/

- Ver o video e aplicar ideias na plataforma: 22 AI Business Ideas https://m.youtube.com/watch?v=I40JZGcfgtk



- Bug: se coloco o email do dono da agencia em add team user, ele cria mesmo assim e vai pro model Invitation e isso quebra a aplicação
resolvido criando uma querie para verificar antes de chamar o sendInvitation:

```
export const canCreateInvitation = async (
  email: string,
  role: Role,
  agencyId: string
): Promise<boolean> => {
  const existingUser = await db.user.findFirst({
    where: {
      OR: [
        { email, role: 'AGENCY_OWNER', agencyId: null },
        { email, role: { not: 'AGENCY_OWNER' }, agencyId },
      ],
    },
  });

  // Verifica se não existe um usuário com o mesmo e-mail e papel
  return !existingUser;
};


export const sendInvitation = async (
  role: Role,
  email: string,
  agencyId: string
) => {
  // Verifica se é possível criar um convite
  const canCreate = await canCreateInvitation(email, role, agencyId);

  if (!canCreate) {
    // Aqui você pode decidir como lidar quando não pode criar um convite
    console.log('Cannot create invitation. User already exists.');
    return null;
  }

  // Cria o convite se for possível
  const response = await db.invitation.create({
    data: { email, agencyId, role },
  });

  try {
    // Tente criar o convite na Clerk
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