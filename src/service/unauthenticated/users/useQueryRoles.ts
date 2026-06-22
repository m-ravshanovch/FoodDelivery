import {
  useQuery,
  // useQueryClient,
} from "@tanstack/vue-query";

import { useService } from "@/service/unauthenticated/useService";

export const useQueryRoles = () => {
  // const queryClient = useQueryClient();

  const useRoles = () =>
    useQuery({
      queryKey: ["roles"],
      queryFn: async () => {
        const response = await useService.getAllRoles();
        return response.data;
      },
    });


//   const useCreateOrder = () =>
//     useMutation({
//       mutationFn: async (payload: any) => {
//         const response =
//           await useService.createOrder(payload);

//         return response.data;
//       },

//       onSuccess: () => {
//         queryClient.invalidateQueries({
//           queryKey: ["orders"],
//         });
//       },
//     });


  return {
    useRoles
  };
};