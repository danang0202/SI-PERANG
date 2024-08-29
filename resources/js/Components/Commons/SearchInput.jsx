import { CloseButton, Input } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import React from 'react'

const SearchInput = ({ keyword, setKeyword }) => {
    return (
        <Input
            placeholder="Masukkan kata kunci..."
            value={keyword}
            onChange={(event) => setKeyword(event.currentTarget.value)}
            rightSectionPointerEvents="all"
            radius={'xs'}
            size='xs'
            rightSection={
                <>
                    <CloseButton
                        aria-label="Clear input"
                        onClick={() => setKeyword('')}
                        style={{ display: keyword ? undefined : 'none' }}
                    />
                    <IconSearch size={18} style={{ display: keyword ? 'none' : undefined }} />
                </>
            }
        />)
}

export default SearchInput