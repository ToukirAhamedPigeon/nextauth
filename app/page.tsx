import Image from "next/image";
import Link from "next/link";
import {auth} from "@/app/(auth)/auth"
import {prisma} from "./../lib/prisma"

export default async function Home() {
  const session = await auth();
  const users = await prisma.user.findMany({
    select:{
      name:true,
      image:true,
      email:true
    }
  });
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Welcome {session?.user?.name}</h1>
      <div>
        <h2>Users</h2>
        <ul>
          {users.map((user)=>(
            <li key={user.email}>
              <Image src={user.image as string} alt={user.name as string} height={100} width={100} />
              <p>{user.name}</p>
              <p>{user.email}</p>
            </li>
          ))}
        </ul>
      </div>
      {session?(
        <Link href="/api/auth/signout">Sign Out</Link>
      ):(
        <Link href="/api/auth/signin">Sign In</Link>
      )}
      </div>
  );
}
