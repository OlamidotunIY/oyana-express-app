import { ApolloLink, Observable } from "@apollo/client";
import { useGlobalApolloLoading } from "@/lib/globalApolloLoading";

export const createLoadingLink = () =>
  new ApolloLink((operation, forward) => {
    const { increment, decrement } = useGlobalApolloLoading.getState();
    increment();
    let hasDecremented = false;

    const safeDecrement = () => {
      if (hasDecremented) {
        return;
      }

      hasDecremented = true;
      decrement();
    };

    return new Observable((observer) => {
      const subscription = forward(operation).subscribe({
        next: (result) => {
          observer.next(result);
        },
        error: (error) => {
          safeDecrement();
          observer.error(error);
        },
        complete: () => {
          safeDecrement();
          observer.complete();
        },
      });

      return () => {
        safeDecrement();
        subscription.unsubscribe();
      };
    });
  });
