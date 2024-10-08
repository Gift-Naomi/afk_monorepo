import {NDKEvent} from '@nostr-dev-kit/ndk';
import {useMutation} from '@tanstack/react-query';

import {useNostrContext} from '../../context/NostrContext';

export const useSendPrivateMessage = () => {
  const {ndk} = useNostrContext();

  return useMutation({
    mutationKey: ['sendPrivateMessage', ndk],
    mutationFn: async (data: {content: string; tags?: string[][]}) => {
      const event = new NDKEvent(ndk);
      event.kind = 14;
      // const encryptedContent = nip44
      event.content = data.content;
      event.tags = data.tags ?? [];

      return event.publish();
    },
  });
};
