// import Form from "@/components/Form";

import Form from "@/components/Form";

// export default function Home() {
//   return (
//     <div className="max-w-3xl mx-auto">
//       <Form />
//     </div>
//   );
// }

// import Form from "@/components/Form";

   // Force dynamic rendering to skip prerendering
   export const dynamic = 'force-dynamic';

   export default function Home() {
     return (
       <div className="max-w-3xl mx-auto">
         <Form />
       </div>
     );
   }